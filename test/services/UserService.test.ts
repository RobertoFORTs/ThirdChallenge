import { UserRepository } from "../../src/repositories/userRepository/UserRepository";
import { UserService } from "../../src/services/UserService";
import {User} from "../../src/models/userModel/User";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);


describe( "User", () => {

  describe("given the request of get Users", () => {

    const userReturned = 
    [
      {
      name: "Roberto",
      cpf: "111.111.111-21",
      birth: "03/04/2000",
      email: "user1@email.com",
      cep: "77777777",
      qualified: true,
      patio: "",
      complement: "",
      neighborhood: "praça",
      locality: "Campo Grande",
      uf: "MS"
    },
    {
      name: "Pedro",
      cpf: "222.222.222-12",
      birth: "03/04/2000",
      email: "user1@email.com",
      cep: "77777777",
      qualified: true,
      patio: "",
      complement: "",
      neighborhood: "praça",
      locality: "Campo Grande",
      uf: "MS"
    }
    ];

    const queryObj = {};
    const pagination = {
      page: 1,
      limit: 100
    };

    it("should return the matching users", async () => {
      
      userRepository.getUsers = jest.fn(() => Promise.resolve({data: [userReturned]}));

      const expectedUsers = userService.getUsersService(queryObj, pagination);

      expect(expectedUsers).toEqual(userReturned);
    });

    it("should thow error if there are no users", async () => {

    });

    it("should call the query filtering", async () => {

    });

    it("should call the query paginate", async () => {

    });

  });

  describe("given the user ID", async() => {

    it("should call the method to get user by id", async () => {

    });

    it("should throw error 404 if user is not found", async () => {

    });

    it("should return user payload", async () => {

    });

  });
  describe("given the register data Input", async() => {

    it("should call the parseQualified method", async () => {

    });

    it("should call the get cep method", async () => {

    });

    it("should call the register repository method", async () => {

    });

    it("should return the user payload", async () => {

    });
  });
  
  describe("given the update data Input", async() => {

    it("should call the parseQualified method", async () => {

    });

    it("should call the get cep method", async () => {

    });

    it("should call the update repository method", async () => {

    });

    it("should throw error 404 if user is not found", async () => {

    });

    it("should return the user payload", async () => {

    });
  });

  describe("given the request for Deleting the user", async() => {

    it("should call the delete method for Users", async () => {

    });

    it("should thorw error 404 if user not found", async () => {

    });

    it("should return status code 204 with no data", async () => {
      
    })
  });
});