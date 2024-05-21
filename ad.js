<script>
	// search object where set the value
	const searchObject = {
		vehicle: {
			brand: `${fillValueHave(document.querySelector(`[data-val="brand"]`),"button")}`,
			model: `${fillValueHave(document.querySelector(`[data-val="model"]`),"button")}`,
			varient: "",
		},
		features: {
			construction: `${fillValueHave(document.querySelector(`[data-val="construction"]`),"button")}`,
			seats: `${fillValueHave(document.querySelector(`[data-val="seats"]`),"button")}`,
			doors: `${fillValueHave(document.querySelector(`[data-val="doors"]`),"button")}`,
		},
		furnishing: {
			checkboxes: [],
		},
		drive: {
			drive_type: `${fillValueHave(document.querySelector(`[data-val="drive_type"]`),"button")}`,
			gearbox: `${fillValueHave(document.querySelector(`[data-val="gearbox"]`),"button")}`,
			performance: {
				from: "",
				to: ""
			},
			gears_number: `${fillValueHave(document.querySelector(`[data-val="gears_number"]`),"button")}`,
			cylinder: `${fillValueHave(document.querySelector(`[data-val="cylinder"]`),"button")}`,
			displacement: `${fillValueHave(document.querySelector(`[data-input="displacement"]`),"input")}`,
			curb: `${fillValueHave(document.querySelector(`[data-input="curb"]`),"input")}`,
		},

		environment: {
			fuel: `${fillValueHave(document.querySelector(`[data-val="fuel"]`),"button")}`,
			energy_source: `${fillValueHave(document.querySelector(`[data-val="energy_source"]`),"button")}`,
			combined: `${fillValueHave(document.querySelector(`[data-input="combined"]`),"input")}`,
			emission: `${fillValueHave(document.querySelector(`[data-input="emission"]`),"input")}`,
			emission_class: `${fillValueHave(document.querySelector(`[data-val="emission_class"]`),"button")}`,
		},
		colors: {
			exterior_color: ``,
			interior_color: ``,
			decoration: ``,
		},
		condition: {
			vehicle_type: `${fillValueHave(document.querySelector(`[data-val="vehicle_type"]`),"button")}`,
			mielage: "",
			registration: {
				month: "",
				year: "",
			},
			owner: `${fillValueHave(document.querySelector(`[data-val="owner"]`),"button")}`,
			next_inspection: {
				month: "",
				year: "",
			},
			final_inspection: {
				month: "",
				year: "",
			},
			belt_change: {
				month: "",
				year: "",
			},
			checkboxes: [],
		},
		pictures: "",
		decription: "",
		price: {
			price_input: `${fillValueHave(document.querySelector(`[data-input="price_input"]`),"input")}`,
			checkboxes: [],
		},

		contact: {
			zip_code: "",
			city: "",
			phone_num: "",
		}
	}


	// a make empty array for set all value in left side side bar array form

	let addValueArray = {
		'vehicle': [],
		'features': [],
		'condition': [],
		'drive': [],
		'environment': [],
		'colors': [],
		'price': [],
	};

	// fill if value have already selected then add in object and show in left side sidebar for all select tag

	function fillValueHave(button, type) {
		// console.log(button)
		// check type is input or select

		if (type == "button") {

			// find input of all select button
			let findInput = button.nextElementSibling;

			// check if input exist have value then add text in button otherwise object empty;
			if (findInput.value != "") {
				return button.innerText;
			} else {
				return "";
			}
		}

		// check type is input then return input value
		if (type == "input") {
			if (button.value != "") {
				return button.value;
			} else {
				return "";
			}
		}

	}


	// set value from object in left side bar;

	const findAllSelectButton = document.querySelectorAll('[data-val]');


	function findValueFromObject(select, type) {

		// find the data value id and find button name;

		let findSelectName;

		if (type == "select") {
			findSelectName = select.getAttribute("data-val");
		}

		if (type == "input") {
			findSelectName = select.getAttribute("data-input");
		}

		// find the parent name by which object parent element name

		let parentSelectName = select.closest("[data-ad").getAttribute("data-ad");

		setValueFromObject(findSelectName, parentSelectName);
	}


	// set value from object

	function setValueFromObject(dataName, dataParent) {

		// find left side sidebar tag where can  value add insert

		let findDataTag = document.querySelector(`[data-sidebar="${dataParent}"]`);

		// check if any value not selected then  show here error

		if (searchObject[`${dataParent}`][`${dataName}`] == "") {

		} else {

			let text = addTextWithNumber(dataName);


			if (dataName == "seats" || dataName == "doors" || dataName == "owner" ||
				dataName == "gears_number" || dataName == "cylinder" || dataName == "displacement" ||
				dataName == "curb" || dataName == "combined" || dataName == "emission") {

				addValueArray[`${dataParent}`].push(searchObject[`${dataParent}`][`${dataName}`] + ` ${text}`);

			} else {
				addValueArray[`${dataParent}`].push(searchObject[`${dataParent}`][`${dataName}`]);
			}


			findDataTag.innerText = addValueArray[`${dataParent}`].join(', ');
		}

	}



	// check if data name have doors, km , kw , owner and etc then add with number text also


	function addTextWithNumber(dataText) {

		let textVal;


		switch (dataText) {
			case 'seats':
				textVal = "seats";
				break;
			case 'doors':
				textVal = "doors";
				break;
			case 'owner':
				textVal = "owner";
				break;
			case 'gears_number':
				textVal = "gears";
				break;
			case 'cylinder':
				textVal = "cylinder";
				break;
			case 'displacement':
				textVal = "cm3";
				break;
			case "curb":
				textVal = "kg";
				break;
			case "combined":
				textVal = "l/100 km";
				break;
			case "emission":
				textVal = "g/km";
				break;
		}

		return textVal;
	}

	// iterate all button and send button value or name

	if (findAllSelectButton) {
		findAllSelectButton.forEach(button => {
			findValueFromObject(button, "select");
		});

	}

	// find all input on post ad page if input have already value


	const findAllInputText = document.querySelectorAll("[data-input]");

	if (findAllInputText) {
		findAllInputText.forEach(input => {
			findValueFromObject(input, "input");
		})
	}


	// all radio checked or not

	const allRadioColor = document.querySelectorAll('[data-color]');

	function allRadioChekedOrNot(colorDiv, main) {

		let allInputs = colorDiv.querySelectorAll("input");
		allInputs.forEach(input => {

			input.addEventListener("change", function() {
				if (input.checked) {
					let findParent = this.closest("[data-color]").getAttribute("data-color");
					searchObject[`${main}`][`${findParent}`] = this.nextElementSibling.innerText;
					addValueArray[`${main}`].push(searchObject[`${main}`][`${findParent}`]);
					console.log(addValueArray)
					document.querySelector(`[data-sidebar="${main}"]`).innerText = addValueArray[`${main}`]
				}
			})

		})

	}

	// current time change input select value changes



	// all checkboxes insert or remove

	const allCheckboxes = document.querySelectorAll('[data-ad] .single_check input');

	function checkBoxesList(allCheckboxes) {

		allCheckboxes.forEach(input => {
			input.addEventListener("change", function() {

				// find parent node and main node

				let parentNode = this.closest("[data-ad]").getAttribute("data-ad");

				console.log(parentNode)

				// find text of this input checked

				let findText = this.nextElementSibling.innerText;


				if (this.checked) {

					setValCheckboxes(findText, parentNode, true);
				} else {
					setValCheckboxes(findText, parentNode, false);
				}

			})
		})

	};


	// set value of checkboxes

	const setValCheckboxes = (text, objectKey, condition) => {

		let sideBarTag = document.querySelector(`[data-sidebar="${objectKey}"]`);

		if (condition) {
			searchObject[`${objectKey}`]['checkboxes'].push(text);
			// show in sidebar
			sideBarTag.innerText = searchObject[`${objectKey}`]['checkboxes'].join(', ');

			if (searchObject[`${objectKey}`]['checkboxes'].length >= 1) {
				sideBarTag.classList.add("data")
			}

		} else {

			let val = searchObject[`${objectKey}`]['checkboxes'].indexOf(text);
			if (val !== -1) {

				searchObject[`${objectKey}`]['checkboxes'].splice(val, 1);
				sideBarTag.innerText = searchObject[`${objectKey}`]['checkboxes'];
			}

			if (searchObject[`${objectKey}`]['checkboxes'].length < 1) {
				sideBarTag.innerText = "Please fill";
				sideBarTag.classList.remove("data")
			}
		}

	}

	checkBoxesList(allCheckboxes)


	if (allRadioColor) {
		allRadioColor.forEach(container => {
			allRadioChekedOrNot(container, "colors");
		})

	}




	// all radio input for checked or not

	let updateArray = {
		vehicle: [{
			idx: 0,
			brand: "",
			model: "",
			variant: "",
		}, ],
		features: [{
			idx: 1,
			construction: "",
			seats: "",
			doors: "",
		}]

	}


	const sendSearchData = (button, type) => {

		// find button or select name

		let findKey;

		// find selected text

		let findSelectText

		if (type == "select") {

			findKey = button.getAttribute("data-val");

			findSelectText = button.innerText;


		}

		if (type == "input") {

			findKey = button.getAttribute("data-text");

			findSelectText = button.value;
		}

		// find parent node
		let findParent = button.closest("[data-ad]").getAttribute("data-ad");


		updateValue(findParent, findKey, findSelectText);

	};

	// update value of object

	const updateValue = (objectArr, objectKey, selectText) => {

		let textCondition = addTextWithNumber(objectKey);

		// add more text after number if exist

		// add select value in array 

		updateArray[`${objectArr}`][0][`${objectKey}`] = (textCondition == undefined) ? selectText + ", " : selectText + ` ${textCondition}` + ", ";

		updateSidebar(objectArr, objectKey, );


	};

	// update sidebar

	const updateSidebar = (dataId, objectKey) => {

		let findSidebarTag = document.querySelector(`[data-sidebar="${dataId}"]`);

		findSidebarTag.innerHTML = "";

		console.log(updateArray[`${dataId}`][0])

		for (let key in updateArray[`${dataId}`][0]) {

			let span = document.createElement("span");

			if (key != "idx") {

				span.innerText = updateArray[`${dataId}`][0][key];

				findSidebarTag.appendChild(span)
			}
		};

	};


	// for all input where can type user
	const inputValChange = (evt, current) => {

		sendSearchData(current, "input");

	}
</script>