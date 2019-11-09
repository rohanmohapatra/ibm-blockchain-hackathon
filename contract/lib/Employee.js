'use strict'
class Employee {
    constructor(employeeId, data = null){
        this.employeeId = employeeId;
        this.data = data;
    }
}

module.exports = Employee;