function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employee, dateStamp) {
    if (!dateStamp) {
        throw new Error('Date stamp is missing');
    }

    const dateTimeArray = dateStamp.split(' ');
    if (dateTimeArray.length !== 2) {
        throw new Error('Invalid date stamp format');
    }

    const [date, hour] = dateTimeArray;

    if (!date || !hour) {
        throw new Error('Invalid date or hour in date stamp');
    }

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    if (!dateStamp) {
        throw new Error('Date stamp is missing');
    }

    const dateTimeArray = dateStamp.split(' ');
    if (dateTimeArray.length !== 2) {
        throw new Error('Invalid date stamp format');
    }

    const [date, hour] = dateTimeArray;

    if (!date || !hour) {
        throw new Error('Invalid date or hour in date stamp');
    }

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

    if (!timeInEvent || !timeOutEvent) {
        throw new Error('No matching timeIn or timeOut event found for the given date');
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
