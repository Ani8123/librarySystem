const dbAccesor = require("../dbaccess/connector");
const constants = require("../utils/constants");

class LibraryController {
    async fetchIssuedBooks() {
        try {
            const conditionQuery = {
                is_returned: false,
            };
            const libraryModel = await dbAccesor.libraryModel();
            const dbResult = await libraryModel.find(conditionQuery);
            if (dbResult) {
                return { Data: dbResult };
            } else {
                return {
                    Data: [],
                };
            }
        } catch (error) {
            throw Error(error);
        }
    }

    async fetchAllAvailbleBookData() {
        try {
            const conditionQuery = {
                is_returned: true,
                is_issuable: true,
            };
            const libraryModel = await dbAccesor.libraryModel();
            const dbResult = await libraryModel.find(conditionQuery);

            if (dbResult) {
                return { Data: dbResult };
            } else {
                return {
                    Data: [],
                };
            }
        } catch (error) {
            throw Error(error);
        }
    }

    async postIssueBook(requestData, response) {
        try {
            const {
                book_id,
                member_id,
                member_name,
                member_email,
            } = requestData;
            const libraryModel = await dbAccesor.libraryModel();
            const conditionQuery = {
                book_id : book_id
            }
            const dbResult = await libraryModel.find(conditionQuery);
            if (dbResult) {
                const condition = {
                    book_id: book_id,
                };
                const updatedData = {
                    member_id: member_id,
                    member_name: member_name,
                    member_email: member_email,
                    issue_date: new Date(),
                    is_returned: false,
                    is_issuable: false,
                };
                try {
                    const result = await libraryModel.collection.updateOne(
                        condition,
                        {$set : updatedData}
                    );
                    return {
                        Message: "Successfully Issued Book!",
                    };
                } catch (error) {
                    throw new Error(error);
                }
            } else {
                const message = `Book Id provided is Invalid : ${book_id}`;
                response.status(constants.INVALID_PARAMETER_CODE).json({
                    CODE: constants.INVALID_PARAMETER_CODE,
                    ERROR: constants.INVALID_PARAMETER,
                    DESCRIPTION: message,
                });
            }
        } catch (error) {
            throw Error(error);
        }
    }
}

module.exports = new LibraryController();
