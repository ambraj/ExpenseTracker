package com.example.expense.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@Table(name="category")
public class Category {

	@Id
	private Long id;
	
	// travel, grocery, ......
	private String name;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	private User user;
	
}
