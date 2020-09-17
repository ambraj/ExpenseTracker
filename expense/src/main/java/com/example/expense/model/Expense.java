package com.example.expense.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@Entity
@Table(name = "expense")
public class Expense {

	@Id
	private Long id;
	
	private String description;
	
	private Instant expenseDate;
	
	private String location;
	
	@ManyToOne
	private Category category;

	@JsonIgnore
	@ManyToOne
	private User user;
	
}