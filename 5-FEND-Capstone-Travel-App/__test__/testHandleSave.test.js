import {
    removeOp,
    dateDifference,
    getGeoName,
    getWeatherbit,
    getPixabay,
    postData,
    handleSave,} from '../src/client/js/app';


describe("Testing the 'save trip' button functionality", () => {
    test('Testing the removeOp() function', () => {
        const str = "Hello !@#&*W1o3r8l!d";
        expect(removeOp(str)).toBe('Hello World');
    });

    test('Testing the dateDifference() function', () => {
        const today = new Date();
        const otherDate = new Date('2021-08-15');
        expect(dateDifference(today, otherDate)).toBe(10);
    });

    test('Testing the getGeoName() function', () => {
        expect(getGeoName).toBeDefined();
    });

    test('Testing the getWeatherbit() function', () => {
        expect(getWeatherbit).toBeDefined();
    });

    test('Testing the getPixabay() function', () => {
        expect(getPixabay).toBeDefined();
    });

    test('Testing the postData() function', () => {
        const travelInfoData = {
            orig: 'Paris',
            dest: 'Los Angeles',
            date: '2021-08-10',
            lat: '34.05223',
            lng: '-118.24368',
            temp: 23.8,
            desc: 'Clear Sky',
            city: 'Los Angeles',
            image: 'https://pixabay.com/get/g406b16d14b1774f9fb53a60174d24304b60cac1d415bc52160e0a617bc47da999960adaae7b077c6ea9ab8209b75841e2704a5c9941aa4d01659cb7872669a31_640.jpg'
        }
        postData('http://localhost:8081/postTraveInfo', travelInfoData).then(data => {
            expect(data.orig).toBe('Paris');
            expect(data.dest).toBe('Los Angeles');
            expect(data.date).toBe('2021-08-10');
            expect(data.lat).toBe('34.05223');
            expect(data.lng).toBe('-118.24368');
            expect(data.temp).toBe('23.8');
            expect(data.desc).toBe('Clear Sky');
            expect(data.city).toBe('Los Angeles');
            expect(data.image).toBe('https://pixabay.com/get/g406b16d14b1774f9fb53a60174d24304b60cac1d415bc52160e0a617bc47da999960adaae7b077c6ea9ab8209b75841e2704a5c9941aa4d01659cb7872669a31_640.jpg');
        })
    });

    test('Testing the getPixabay() function', () => {
        expect(handleSave).toBeDefined();
    });

});