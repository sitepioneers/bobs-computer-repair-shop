/*
 *  Title: security-question.model.ts
 *  Author: April Auger
 *  Date: 16 April 2020
 *  Description: The security question model for the BCRS application.
 */

// Export the SecurityQuestion class
export class SecurityQuestion {
	_id: string;
	text: string;
	isDisabled: boolean;
}