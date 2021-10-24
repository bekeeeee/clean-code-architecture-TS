export class GetOneUserByPhoneNumberDto {
    constructor(public readonly phoneNumber: string) {}
  
    static from(body: Partial<GetOneUserByPhoneNumberDto>) {
      if (!body.phoneNumber) {
        throw new Error("missing username property");
      }
  
      return new GetOneUserByPhoneNumberDto(body.phoneNumber);
    }
  }
  