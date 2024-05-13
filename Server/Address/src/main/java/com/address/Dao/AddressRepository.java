package com.address.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.address.Model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

      List<Address> findByUserId(Long userId);
}
