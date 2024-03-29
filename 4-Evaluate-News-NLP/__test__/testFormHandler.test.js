import { handleSubmit, postData, isValidURL } from "../src/client/js/formHandler";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    test('Testing the isValidURL() function', () => {
        const str1 = "https://manjaro.org/";
        const str2 = "asfsadfdasfdas";

        expect(isValidURL(str1)).toBeTruthy();
        expect(isValidURL(str2)).toBeFalsy();
    });


    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(handleSubmit).toBeDefined();
    });


    test('Testing the postData() function', () => {
        const dataObj = {
            text: 'https://www.google.com/'
        };
        return postData('http://localhost:8081/textAnalysis', dataObj).then(data => {
            expect(data.score_tag).toBe('NONE');
            expect(data.subjectivity).toBe('OBJECTIVE');
            expect(data.confidence).toBe('100');
            expect(data.irony).toBe('NONIRONIC');
        });
    });

});


