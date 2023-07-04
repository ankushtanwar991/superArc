import emailjs from '@emailjs/browser';

export const SendEmail = (data) => {
    console.log(data)
    let template = {
        Contractor: 'template_39kgd7e',
        Customer: 'template_wcrd1la'
    }



    emailjs.send('service_m9h5vil', template[data.template_name], data, 'fYJcfXGQn6v7rwZ_J')
        .then((result) => {
            console.log(result.text);


        }, (error) => {
            console.log(error.text);
        });
}