/*
 *  Title: user.model.ts
 *  Author: April Auger
 *  Date: 16 April 2020
 *  Description: The user model for the BCRS application.
 */

// Required modules
import { UserSecurityQuestion } from './user-security-question.model';

// Export the class
export class User {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	email: string;
	isDisabled: boolean;
	role: string;
	securityQuestions: UserSecurityQuestion[];
	date_created: string;
	date_modified: string;
}