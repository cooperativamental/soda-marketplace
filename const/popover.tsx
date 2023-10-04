import { Button, Typography } from "@material-tailwind/react";

export const contentToolTip = {
    instructions: 
    <div className="p-2">
              <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
              Instructions:
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
              These are the actual functions or methods that can be called on the Solana program. Each method will have a name and a list of arguments it accepts. This part tells the client-side how to correctly call the function on-chain. A client can include one or multiple instructions in a transaction. An instruction may contain one or more cross-program invocations (CPIs). 
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-snug">
              <h5>Each instruction in the IDL will typically have:</h5> {'\u2022'} A name, defining the method's identifier. <br></br> {'\u2022'} Arguments, which detail the expected input parameters for the function. This can include both simple data types and complex custom types defined elsewhere in the IDL. <br></br> {'\u2022'} Accounts, indicating which Solana accounts the instruction expects to interact with and the roles or permissions required for each. <br></br> {'\u2022'}  Returns, possible events or errors that can be emitted or returned upon the instruction's execution.       
              </Typography>
              <a href="https://docs.solana.com/developing/programming-model/transactions#instructions" target="_blank" className="inline-block">
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-1 capitalize text-blue-custom"
                >
                  Read More
                  <svg
                    xmlns=""
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
      </div>
    ,
    accounts: 
    <div className="p-2">
              <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
              Accounts:
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
               They are flexible storage structures associated with specific programs and can hold arbitrary state data. In your IDL, you'll define which accounts an instruction expects, detailing their roles and attributes. This specification streamlines client interactions, ensuring they provide the necessary accounts with the correct attributes for each instruction. Think of accounts in your IDL as the external interfaces or connectors that your program's functions need to operate efficiently. 
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
              <h4> {'\u2022'}Data accounts store information and manage the state of the network. There are two types of data accounts:
                System-owned accounts [example: A User Wallet] and Program-derived accounts (aka PDAs) [example: A User's Token Account] </h4>
                <h4> {'\u2022'} Program accounts hold executable code. These accounts are stateless (meaning data passes through them but does not update them). </h4>
               <br></br>
               Account Attributes in IDL: <br></br>{'\u2022'} Name: A descriptive identifier for the account. <br></br>{'\u2022'} isMut: A boolean indicating if the account data can be modified (mutable) during the instruction. <br></br>{'\u2022'} isSigner: A boolean that signifies if the account is required to sign the transaction. <br></br>{'\u2022'} isOptional: (If applicable) Indicates if the account is optional for the instruction.
              </Typography>
              <a href="https://docs.solana.com/developing/programming-model/accounts" target="_blank" className="inline-block">
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-1 capitalize text-blue-custom"
                >
                  Read More
                  <svg
                    xmlns=""
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
      </div>
      ,
    types: 
    <div className="p-2">
              <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
              Types
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
              Types play an instrumental role in defining and describing the custom data structures your program uses. These types are paramount for understanding how data is organized, interpreted, and transmitted between a client and a Solana program.
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-snug">
              <h5>Basic Data Types:</h5> {'\u2022'} u8, u16, u32, u64: Unsigned integers of 8, 16, 32, or 64 bits, respectively. <br></br> {'\u2022'} i8, i16, i32, i64: Signed integers of 8, 16, 32, or 64 bits, respectively. <br></br> {'\u2022'} bool: Boolean data type, representing true or false. <br></br> {'\u2022'} byte: A single byte of data. <br></br>Custom Data Structures: You can define custom data structures (usually structs) in your IDL to represent more complex data. These structures can include multiple fields, each with its own type."
              </Typography>
              {/* <a href="https://docs.solana.com/developing/programming-model/transactions#instructions" className="inline-block">
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-1 capitalize text-blue-custom"
                >
                  Read More
                  <svg
                    xmlns=""
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a> */}
      </div>
      ,
    events:
    <div className="p-2">
              <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
              Events
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
              are custom-defined structures that represent significant occurrences in a program. When a particular action or set of conditions is met, a program can emit an event to log that occurrence. Clients and services can then monitor for these events to trigger specific actions or updates off-chain. Within the IDL, events serve as a blueprint for the kind of log data a program can emit. By defining events, developers offer a clear schema of what external systems should look for and how to interpret the emitted data.
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-snug">
              <h5>Each event will have:</h5> {'\u2022'} Name: A descriptive identifier for the event. <br></br> {'\u2022'} Fields: These describe the data associated with the event. Each field has a name and a type, indicating the kind of information carried by the event.
              </Typography>
      </div>
    ,
    errors:
    <div className="p-2">
              <Typography color="blue-gray" className="text-green-custom mb-2 font-medium leading-tight">
              Errors
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-tight">
              In Solana IDL, errors provide a standardized mechanism to describe possible issues or exceptions that might occur during the execution of a program. By explicitly defining errors, developers give clients a roadmap for understanding and handling potential problems. 
              </Typography>
              <Typography variant="paragraph" color="gray" className="text-chok mb-4 font-normal leading-snug">
              <h5>Errors in Solana IDL typically have a structured definition, including:</h5> {'\u2022'} Name: A unique identifier for the error. <br></br> {'\u2022'} Code: A numerical code associated with the error, allowing for easy identification.  <br></br> {'\u2022'} Description: (Optional) A descriptive message or detail about the error.
              </Typography>
      </div>
  }