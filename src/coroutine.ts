
// CoroutineResult type
type CoroutineResult<T> = Promise<T> | T;

type Coroutine<T> = Generator<CoroutineResult<T>, void, unknown>;

export function coroutine<T>(generatorFunction: () => Coroutine<T>) {
    const generator = generatorFunction();

    function handle(result: IteratorResult<CoroutineResult<T>, void>): Promise<void> | void {
        if (result.done) return Promise.resolve(result.value);

        const value = result.value;
        return Promise.resolve(value)
            .then(res => handle(generator.next(res)))
            .catch(err => handle(generator.throw(err)));
    }

    try {
        return handle(generator.next());
    } catch (ex) {
        return Promise.reject(ex);
    }
}
