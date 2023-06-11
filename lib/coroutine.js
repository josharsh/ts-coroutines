"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coroutine = void 0;
function coroutine(generatorFunction) {
    const generator = generatorFunction();
    function handle(result) {
        if (result.done)
            return Promise.resolve(result.value);
        const value = result.value;
        return Promise.resolve(value)
            .then(res => handle(generator.next(res)))
            .catch(err => handle(generator.throw(err)));
    }
    try {
        return handle(generator.next());
    }
    catch (ex) {
        return Promise.reject(ex);
    }
}
exports.coroutine = coroutine;
