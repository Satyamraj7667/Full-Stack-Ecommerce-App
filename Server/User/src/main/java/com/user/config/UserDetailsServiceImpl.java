package com.user.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.user.Dao.UserRepository;
import com.user.Model.User;

public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userrepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		List<User> l = userrepo.findByEmail(username);
		if(l.isEmpty()==true) {
			throw new UsernameNotFoundException("could not found the user !!");
		}
		User u = l.get(0);
		return u;
	}

}
