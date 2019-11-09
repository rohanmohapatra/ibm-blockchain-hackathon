/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CustomerVerificationContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('CustomerVerificationContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CustomerVerificationContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"customer verification 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"customer verification 1002 value"}'));
    });

    describe('#customerVerificationExists', () => {

        it('should return true for a customer verification', async () => {
            await contract.customerVerificationExists(ctx, '1001').should.eventually.be.true;
            
        });
        it('should return true for a customer verification', async () => {
            await contract.CreateEmployee(ctx, '{"employeeId":"iot"}');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"customer verification 1003 value"}'));
        });

        it('should return false for a customer verification that does not exist', async () => {
            await contract.customerVerificationExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createCustomerVerification', () => {

        it('should create a customer verification', async () => {
            await contract.createCustomerVerification(ctx, '1003', 'customer verification 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"customer verification 1003 value"}'));
        });

        it('should throw an error for a customer verification that already exists', async () => {
            await contract.createCustomerVerification(ctx, '1001', 'myvalue').should.be.rejectedWith(/The customer verification 1001 already exists/);
        });

    });

    describe('#readCustomerVerification', () => {

        it('should return a customer verification', async () => {
            await contract.readCustomerVerification(ctx, '1001').should.eventually.deep.equal({ value: 'customer verification 1001 value' });
        });

        it('should throw an error for a customer verification that does not exist', async () => {
            await contract.readCustomerVerification(ctx, '1003').should.be.rejectedWith(/The customer verification 1003 does not exist/);
        });

    });

    describe('#updateCustomerVerification', () => {

        it('should update a customer verification', async () => {
            await contract.updateCustomerVerification(ctx, '1001', 'customer verification 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"customer verification 1001 new value"}'));
        });

        it('should throw an error for a customer verification that does not exist', async () => {
            await contract.updateCustomerVerification(ctx, '1003', 'customer verification 1003 new value').should.be.rejectedWith(/The customer verification 1003 does not exist/);
        });

    });

    describe('#deleteCustomerVerification', () => {

        it('should delete a customer verification', async () => {
            await contract.deleteCustomerVerification(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a customer verification that does not exist', async () => {
            await contract.deleteCustomerVerification(ctx, '1003').should.be.rejectedWith(/The customer verification 1003 does not exist/);
        });

    });

});