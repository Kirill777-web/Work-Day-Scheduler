//Declaring const
const currentHour = dayjs().hour();
const timeBlocks = document.querySelectorAll('.time-block');
const currentDateElement = document.querySelector('#currentDay');

$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  $('.saveBtn').on('click', function () {
    //Choosing the div class .time-block and att id
    let timeBlockId = $(this).closest('.time-block').attr('id');
    //get the value of the text-erea with the same class
    let userInput = $(this).closest('.time-block').find('.description').val();
    //save user input to local storage
    localStorage.setItem(timeBlockId, userInput);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  //First define current time

  //This line selects all elements with the class (time-block) and iterate over each tme block
  document.querySelectorAll('.time-block').forEach((block) => {
    //extracting the hour from the time block's id
    let blockHour = parseInt(block.id.split('-')[1]);
    //converting to 24h for simplify the logic
    if (blockHour < 9) {
      blockHour += 12;
    }
    //removing all classes if any exist or not
    block.classList.remove('past', 'present', 'future');

    //compare current hour with block hour to set the right class to change input color
    if (blockHour < currentHour) {
      block.classList.add('past');
    } else if (blockHour === currentHour) {
      block.classList.add('present');
    } else {
      block.classList.add('future');
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  //we are fetching its id attribute
  timeBlocks.forEach(function (block) {
    //Store all id
    const blockId = block.id;
    //check if there's saved data in local storage for taht id
    const savedInput = localStorage.getItem(blockId);

    //if there's saved data it populates the corresponding textarea with that saved data
    if (savedInput) {
      block.querySelector('.description').value = savedInput;
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  let formattedDate = dayjs().format('dddd, MMMM, YYYY');
  currentDateElement.textContent = formattedDate;
});
