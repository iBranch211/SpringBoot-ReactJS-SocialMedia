package com.sept.rest.webservices.restfulwebservices.user;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;


import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sept.rest.webservices.restfulwebservices.model.DAOUser;
import com.sept.rest.webservices.restfulwebservices.model.Profile;
import com.sept.rest.webservices.restfulwebservices.model.ProfileRepository;
import com.sept.rest.webservices.restfulwebservices.model.UserRepository;


@CrossOrigin(origins="http://localhost:4200")
@RestController

public class UserJpaResource {
    @Autowired
	private UserRepository UserRepository;

    @Autowired
    private ProfileRepository profileRepository;
	
	@GetMapping("/jpa/users/{username}/profile")
	public List<DAOUser> getUser(@PathVariable String username){
		return UserRepository.findByUsername(username);
		//return todoService.findAll();
	}
	
	@GetMapping("/jpa/users/{username}/profile/details")
	public Profile getProfileDetails(@PathVariable String username) {
		return profileRepository.findByUsername(username);
	}

	@GetMapping("/jpa/users/all/profile")
	public List<DAOUser> getAll(){
		// System.out.println(UserRepository.findAll().get(0).getUsername());
		// System.out.println(UserRepository.findAll().get(0).getPassword());
		// System.out.println(UserRepository.findAll().get(1).getUsername());
		// System.out.println(UserRepository.findAll().get(1).getPassword());
		// System.out.println(UserRepository.findAll().get(2).getUsername());
		// System.out.println(UserRepository.findAll().get(2).getPassword());
		// List<DAOUser> hardcodeList = new ArrayList<DAOUser>();
		// DAOUser hardcodeUser = new DAOUser();
		// hardcodeList.add(hardcodeUser);
		// hardcodeUser.setEmail("email@hardcode.com");
		// return hardcodeList;
		return UserRepository.findAll();
		//return todoService.findAll();
	}

	// @GetMapping("/jpa/users/{username}/todos/{id}")
	// public Todo getTodo(@PathVariable String username, @PathVariable long id){
	// 	return UserRepository.findById(id).get();
	// 	//return todoService.findById(id);
	// }
}