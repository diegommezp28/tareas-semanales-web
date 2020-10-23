import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

/**
 * 
 * @param {*} fields. Se refiere a los campos que tendrá el formulario, es un arreglo de objetos. Cada
 * objeto tiene la información necesaria para renderizar un campo, tienen que tener los siguientes 
 * Atributos: 
 * label (No requerido, defecto vacío); type (No requerido, texto por defecto)
 * placeholder (no requerido, vacío por defecto); required (Boolean para ver si el campo es requerido. Por defecto False)
 * text (parámetro dentro de Form.Text, vacío por defecto). 
 * Un ejemplo de fields sería: 
 * fields = [{label: "Email address", type: "email", placeholder: "Enter email", required: true, text: "This is a description"}]
 */
function GenericForm(props) {
    const [formFields, setFormFields] = useState(props.fields);

    function makeField(field) {
        const label = field.label || "";
        const type = "text" || field.type;
        const placeholder = field.placeholder || "";
        const required = field.required || false;
        const text = field.text || "";

        return (
        <Form.Group >
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} required={required} />
            <Form.Text className="text-muted">{text}
            </Form.Text>
        </Form.Group>
        )
    }

    return (
        <Form>
            {formFields.map((field)=> makeField(field))}
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default GenericForm;