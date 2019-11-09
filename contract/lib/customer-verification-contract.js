/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
let Employee = require('./Employee.js');


class CustomerVerificationContract extends Contract {

    // Init function executed when the ledger is instantiated
    /*async instantiate(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        
        await ctx.stub.putState('instantiate', Buffer.from('INIT-LEDGER'));
        await ctx.stub.putState(allEmployeeKey, Buffer.from(JSON.stringify([])));

        console.info('============= END : Initialize Ledger ===========');
    }*/
    async CreateEmployee(ctx, employee) {
        console.info('====================================================================Brooo==============================================');
        //console.info(employeeId);
        //console.info(JSON.parse(JSON.stringify(employeeId)));
        console.info(JSON.parse(employee)["employeeId"]);
        console.info(JSON.parse(employee)["data"]);
        let employeeId = JSON.parse(employee)["employeeId"];
        let data = JSON.parse(employee)["data"]
        const asset = await new Employee(employeeId,data);
        const buffer = Buffer.from(JSON.stringify(asset));
        console.info(JSON.stringify(asset));
        console.info('====================================================================Brooo==============================================');
        await ctx.stub.putState(employeeId, buffer);
        return JSON.stringify(asset);
    }


    async customerVerificationExists(ctx, customerVerificationId) {
        const buffer = await ctx.stub.getState(customerVerificationId);
        return (!!buffer && buffer.length > 0);
    }

    async createCustomerVerification(ctx, customerVerificationId, value) {
        const exists = await this.customerVerificationExists(ctx, customerVerificationId);
        if (exists) {
            throw new Error(`The customer verification ${customerVerificationId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(customerVerificationId, buffer);
    }

    async GetEmployeeData(ctx, customerVerificationId) {
        const exists = await this.customerVerificationExists(ctx, customerVerificationId);
        if (!exists) {
            throw new Error(`The customer verification ${customerVerificationId} does not exist`);
        }
        const buffer = await ctx.stub.getState(customerVerificationId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }
    

    async updateCustomerVerification(ctx, customerVerificationId, newValue) {
        const exists = await this.customerVerificationExists(ctx, customerVerificationId);
        if (!exists) {
            throw new Error(`The customer verification ${customerVerificationId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(customerVerificationId, buffer);
    }

    async deleteCustomerVerification(ctx, customerVerificationId) {
        const exists = await this.customerVerificationExists(ctx, customerVerificationId);
        if (!exists) {
            throw new Error(`The customer verification ${customerVerificationId} does not exist`);
        }
        await ctx.stub.deleteState(customerVerificationId);
    }

}

module.exports = CustomerVerificationContract;
