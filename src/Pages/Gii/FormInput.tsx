import {GiiGeneratorAttribute} from "../../API/Gii";
import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete, FormHelperText, TextField} from "@mui/material";
import * as React from "react";
import {matchInputType} from "../../Adapter/yii/inputTypeMatcher";

type FormInputProps = {
    attributeName: string,
    attribute: GiiGeneratorAttribute
};

export function FormInput({attributeName, attribute}: FormInputProps) {
    const form = useFormContext();
    const type= matchInputType(attribute.rules)

    // console.log(
    //     'attribute name', attributeName,
    //     'attribute', attribute.defaultValue,
    // )
    if (type === 'text') {
        return <Controller
            name={attributeName}
            // rules={rules}
            defaultValue={String(attribute.defaultValue ?? '')}
            control={form.control}
            render={({field, fieldState: {error}}) => (
                <>
                    <TextField
                        {...field}
                        placeholder={String(attribute.defaultValue ?? '')}
                        label={attribute.label}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                    {!!attribute.hint && <FormHelperText>{attribute.hint}</FormHelperText>}
                </>
            )}
        />
    }

    if (type === 'select') {
        return <Controller
            control={form.control}
            // rules={rules}
            defaultValue={Array.isArray(attribute.defaultValue) ? attribute.defaultValue : []}
            name={attributeName}
            render={({field: {value, onChange, onBlur, ref}, fieldState: {error}}) => (
                <>
                    <Autocomplete
                        value={value}
                        onChange={(_, items) => onChange(items)}
                        multiple
                        filterSelectedOptions
                        filterOptions={(v) => v}
                        freeSolo={true}
                        options={[]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                ref={ref}
                                onBlur={() => {
                                    onBlur()
                                }}
                                name={attributeName}
                                helperText={error ? error.message : null}
                                error={!!error}
                                label={attribute.label}
                            />
                        )}
                    />
                    <FormHelperText>{attribute.hint}</FormHelperText>
                </>
            )}
        />
    }
    return null
}
