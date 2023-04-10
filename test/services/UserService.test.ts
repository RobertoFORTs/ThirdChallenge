

describe( "User", () => {

  describe("given the request of get Users", () => {

    it("should return the matching users", async () => {

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