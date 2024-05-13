package com.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	

	 @Bean
	    public JwtAuthFilter authFilter() {
	        return new JwtAuthFilter();
	    }
    @Autowired
    private JwtAuthenticationEntryPoint point;
  
    // User Creation 
    @Bean
    public UserDetailsService userDetailsService() { 
        return new UserDetailsServiceImpl(); 
    } 
  
    // Configuring HttpSecurity 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { 
         http.csrf(csrf-> csrf.disable())
         .authorizeHttpRequests(auth -> auth.requestMatchers("/user/**").hasAnyAuthority("NORMAL","ADMIN")
        		                            .requestMatchers("/auth/**").permitAll()
        		                            .anyRequest().authenticated())
         .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
         
         http.addFilterBefore(authFilter(), UsernamePasswordAuthenticationFilter.class);
         return http.build();
    } 
  
    // Password Encoding 
    @Bean
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    } 
  
    @Bean
    public AuthenticationProvider authenticationProvider() { 
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
        authenticationProvider.setUserDetailsService(userDetailsService()); 
        authenticationProvider.setPasswordEncoder(passwordEncoder()); 
        return authenticationProvider; 
    } 
  
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
        return config.getAuthenticationManager(); 
    } 
    
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.addAllowedHeader("Authorization");
        corsConfiguration.addAllowedHeader("Content-Type");
        corsConfiguration.addAllowedHeader("Accept");
        corsConfiguration.addAllowedMethod("POST");
        corsConfiguration.addAllowedMethod("GET");
        corsConfiguration.addAllowedMethod("DELETE");
        corsConfiguration.addAllowedMethod("PATCH");
        corsConfiguration.addAllowedMethod("OPTIONS");
        corsConfiguration.setMaxAge(3600L);
        
    	source.registerCorsConfiguration("/**", corsConfiguration);
    	FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(source));
        bean.setOrder(-102);
    	return bean;
    }
  

}
