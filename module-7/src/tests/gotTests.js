const gotClient = require('../utils/gotClient');
import { createDashboard } from '../helpers/dashboardHelpers';
import { expect } from 'chai';

describe('API tests for GET method', () => {
  it('GET: should return dashboard info', async () => {
    const response = await gotClient.get(`api/v1/default_personal/dashboard`);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.content.length).to.be.equal(1);

    const { id, description, owner, name } = response.body.content[0];
    expect(id).to.be.equal(15);
    expect(name).to.be.equal('DEMO DASHBOARD');
    expect(description).to.be.equal('Ases');
    expect(owner).to.be.equal('default');
  });

  it('GET: should return error with empty filter name parameter in request', async () => {
    const response = await gotClient.get(`api/v1/default_personal/dashboard?filter.eq.name=`);

    const {
      statusCode,
      body: { errorCode, message },
    } = response;
    expect(statusCode).to.be.equal(400);
    expect(errorCode).to.be.equal(40016);
    expect(message).to.be.equal(
      "Error in handled Request. Please, check specified parameters: 'Filter criteria - 'filter.eq.name' value should be not empty'"
    );
  });

  it('POST: should not create dashboard with empty name parameter in reguest body', async () => {
    const reqBody = {
      description: 123,
      name: '',
      share: false,
    };
    const {
      statusCode,
      body: { errorCode, message },
    } = await gotClient.post(`api/v1/default_personal/dashboard`, reqBody, 400);
    expect(statusCode).to.be.equal(400);
    expect(errorCode).to.be.equal(4001);
    expect(message).to.be.equal(
      "Incorrect Request. [Field 'name' should not contain only white spaces and shouldn't be empty. Field 'name' should have size from '3' to '128'.] "
    );
  });

  it('POST: should not create dashboard when share paramenter has string type value', async () => {
    const reqBody = {
      description: 123,
      name: 'New Dashboard',
      share: 'string',
    };
    const {
      statusCode,
      body: { errorCode, message },
    } = await gotClient.post(`api/v1/default_personal/dashboard`, reqBody);
    expect(statusCode).to.be.equal(400);
    expect(errorCode).to.be.equal(4001);
    expect(message).to.include(
      'Incorrect Request. JSON parse error: Cannot deserialize value of type `java.lang.Boolean` from String "string": only "true" or "false" recognized;'
    );
  });

  it('POST: sould create new dashboard', async () => {
    const {
      statusCode,
      body,
      body: { id },
    } = await createDashboard(gotClient, 'New Dashboard');
    expect(statusCode).to.equal(201);
    expect(body).to.have.property('id');
    await gotClient.del(`api/v1/default_personal/dashboard/${id}`);
  });

  it('PUT: should not update non-existent dashboard', async () => {
    const reqBody = {
      description: 'updated description',
      name: 'updated dashboard name',
      share: true,
    };
    const {
      statusCode,
      body: { errorCode, message },
    } = await gotClient.put(`api/v1/default_personal/dashboard/121`, reqBody);
    expect(statusCode).to.be.equal(404);
    expect(errorCode).to.be.equal(40422);
    expect(message).to.be.equal(
      "Dashboard with ID '121' not found on project 'default_personal'. Did you use correct Dashboard ID?"
    );
  });

  it('PUT: should not update dashboard with empty name parameter in request body', async () => {
    const {
      body,
      body: { id },
    } = await createDashboard(gotClient, 'New Dashboard');
    expect(body).to.have.property('id');

    const putBody = {
      description: 'new description',
      share: true,
    };
    const {
      statusCode,
      body: { errorCode, message },
    } = await gotClient.put(`api/v1/default_personal/dashboard/${id}`, putBody);
    expect(statusCode).to.be.equal(400);
    expect(errorCode).to.be.equal(4001);
    expect(message).to.include("Incorrect Request. [Field 'name' should not be null.]");
    await gotClient.del(`api/v1/default_personal/dashboard/${id}`);
  });

  it('PUT: should update dashboard', async () => {
    const {
      body,
      body: { id },
    } = await createDashboard(gotClient, 'New Dashboard');
    expect(body).to.have.property('id');

    const putBody = {
      description: 'updated description',
      name: 'updated dashboard name',
      share: true,
    };

    const {
      statusCode,
      body: { message },
    } = await gotClient.put(`api/v1/default_personal/dashboard/${id}`, putBody);
    expect(statusCode).to.be.equal(200);
    expect(message).to.be.equal(`Dashboard with ID = '${id}' successfully updated`);
    await gotClient.del(`api/v1/default_personal/dashboard/${id}`);
  });

  it('DELETE: should delete dashboard', async () => {
    const {
      body,
      body: { id },
    } = await createDashboard(gotClient, 'New Dashboard');
    expect(body).to.have.property('id');

    const {
      statusCode,
      body: { message },
    } = await gotClient.del(`api/v1/default_personal/dashboard/${id}`);
    expect(statusCode).to.be.equal(200);
    expect(message).to.be.equal(`Dashboard with ID = '${id}' successfully deleted.`);
  });

  it('DELETE: should return error when trying delete non-existent dashboard', async () => {
    const {
      statusCode,
      body: { errorCode, message },
    } = await gotClient.del(`api/v1/default_personal/dashboard/124`);
    expect(statusCode).to.be.equal(404);
    expect(errorCode).to.be.equal(40422);
    expect(message).to.be.equal(
      "Dashboard with ID '124' not found on project 'default_personal'. Did you use correct Dashboard ID?"
    );
  });
});
