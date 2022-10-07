// elements
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const subjectSelect = document.getElementById("subjectSelect");
const descriptionTextArea = document.getElementById("descriptionTextArea");
const termsAndConditionsCheck = document.getElementById("termsAndConditionsCheck");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const descriptionError = document.getElementById("descriptionError");
const termsAndConditionsError = document.getElementById("termsAndConditionsError");

// error responses
const errorDict = {
	"noName": "Love, you ain't no nobody, lift that head up and put your name here",
	"noEmail": "We need to know how to get back to a cinnamon roll like you, and to do that an email",
	"invalidEmail": "Im sorry, our systems are saying \"this email is invalid\" it might be our end but just in case, would you double check you entered everything in correctly your end?",
	"invalidSelection": "Ima be honest here, this is almost certainly our fault- for better results, please restart the page or try again later, uhm sorry bout that-",
	"noDescription": "Sweetheart, you're here to contact us- that means typing a message <3",
	"descriptionToLarge": "Our apoligies, we have limitted storage capacities, if you could shorten the description to 200 characters or less, that'd be greatly appriciated",
	"descriptionToSmall": "As to be able to see your message we require that the description be atleast 15 characters, this is to avoid spam",
	"termsAndConditionsNotChecked": "Honey, as annoying as it may be, for legal purposes, we realy need you to both read and check this box",
	"unableToSendEmailForUnknownReason": "We are greatly sorry, an issue occured while trying to send your message. Our systems maybe down, please try again later. We are sorry for the inconvienence"
}

function emailVariablesValid(name, email, subject, description, checked) {

	let allInputValid = true;

	// check to make sure name isnt empty or exclusively spaces
	if (name == null || name == '') { 
		allInputValid = false;
		nameError.innerHTML = errorDict["noName"];
	} else {
		nameError.innerHTML = "";
	}

	// does same for email
	if (email == null || email == '') { 
		allInputValid = false;
		emailError.innerHTML = errorDict["noEmail"];
	} else {
		emailError.innerHTML = "";
	}

	// tho unlikely make sure that the subject is recognized
	if (isNaN(subject) || parseInt(subject) >= 7 || parseInt(subject) < 0 || parseInt(Number(subject)) !== parseInt(subject)) {
		allInputValid = false;
		subjectError.innerHTML = errorDict["invalidSelection"];
	} else {
		subjectError.innerHTML = "";
	}


	// and again for description
	if (description == null || description == '') { 
		allInputValid = false;
		descriptionError.innerHTML = errorDict["noDescription"];
	} else if (description.length > 200) {
		allInputValid = false;
		descriptionError.innerHTML = errorDict["descriptionToLarge"];
	} else if (description.length < 15) {
		allInputValid = false;
		descriptionError.innerHTML = errorDict["descriptionToSmall"];
	} else {
		descriptionError.innerHTML = "";
	}

	// checks that user has agreed to terms and conditions
	if (!checked) {
		allInputValid = false;
		termsAndConditionsError.innerHTML = errorDict["termsAndConditionsNotChecked"]
	} else {
		termsAndConditionsError.innerHTML = "";
	}

	return allInputValid;
}

function sendEmail(name, email, subject, description) {
	return 1;
}

function emailSubmit() {
	let name = nameInput.value.trim();
	let email = emailInput.value.trim();
	let subject = subjectSelect.value;
	let description = descriptionTextArea.value.trim();
	let termsAndConditions = termsAndConditionsCheck.checked;

	// console.log(`name "${name}"\nemail "${email}"\nsubject ${subject}\ndescription "${description}"\nchecked ${termsAndConditions}`);

	let validEmailContent = emailVariablesValid(name, email, subject, description, termsAndConditions);

	if (!validEmailContent) 
		return;

	let emailErrorLog = sendEmail(name, email, subject, description);

	if (emailErrorLog) {
		alert(errorDict["unableToSendEmailForUnknownReason"], "Email Not Sent");
	}

}
