module.exports = class HomeController {
    getIndex(arg1) {
        return new Promise((resolve, reject) => resolve('GET got it! arg1 = ' + arg1));
    }

    postIndex(arg1) {
        return new Promise((resolve, reject) => resolve('POST got it! arg1 = ' + arg1));
    }
}