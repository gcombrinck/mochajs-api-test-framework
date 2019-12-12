const chai = require('chai');
const chai_ttp = require('chai-http');
const chai_url = require('chai-url');
import { APIRequest } from '../lib/api_calls';
const api = new APIRequest();
const expect = chai.expect;
chai.use(chai_ttp);
chai.use(chai_url);


describe('https://reqres.in sample test', async () => {
    it('POST - Create new User ', async () =>{
        let data = {
            name: "paul rudd",
            movies: ["I Love You Man", "Role Models"]
        };

        let resp = await api.POST('https://reqres.in', '/api/users', data);
        expect(resp).to.have.status(201);
        expect(resp.data).to.have.property('name');
        expect(resp.data.name).to.eql('paul rudd');
        expect(resp.data.movies).to.be.an('array');
        expect(resp.data.movies).to.have.length(2);
        console.log(resp.data);
    });

    it('GET - All users on page 2 ', async () => {
        let params = {
            page: 2,
        };
        let resp = await api.GET('https://reqres.in', '/api/users', params);
        expect(resp).to.have.status(200);
        expect(resp.data.data).to.have.length(6);
        console.log(resp.data.data[0]);
        for (let i = 0; i < resp.data.data.length; i++) {
            expect(resp.data.data[i].avatar).to.have.protocol('https');
            expect(resp.data.data[i].avatar).to.contain.path('/uifaces/faces/twitter/');
        }
    });
});
