import * as yup from "yup";

declare module 'yup' {
    interface MixedSchema<TType, TContext, TDefault, TFlags> {
        sequence(schemas: any[]): this;
    }
}

yup.addMethod(yup.MixedSchema, 'sequence', function (schemas) {
    return this.test(async (value, context) => {
        try {
            for (const schema of schemas) {
                await schema.validate(value);
            }
        } catch ({message}) {
            return context.createError({message: message as any});
        }
        return true;
    });
});

export {yup};
