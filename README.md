# Como usar el sistema

El sistema de solicitudes de inscripciones tardias se utiliza teniendo en mente dos archivos de hojas de cálculo 
con el siguiente formato:

## Archivo de solicitudes de inscripcion tardia
![imagen](https://github.com/user-attachments/assets/0e8d56ff-9190-4961-b179-ba6ce8fe98cd)


## Archivo de cursos 
![imagen](https://github.com/user-attachments/assets/df7e38ef-2217-4a92-8989-8f3ed3b4d47b)

### Como funciona la lectura de archivos

Los nombres de las columnas se mapean como propiedades de los objetos que se manipulan en la GUI.
Estos nombres deben respetarse para que sea posible interpretar los datos correctamente, o podrian pasar cosas innesperadas.

Tambien es posible cambiar los mapeos modificando el archivo maping.json para cambiar las correspondencias entre columnas y propiedades, o para agregar nuevas propiedades que deban ser leidas de nuevas columnas. 

![imagen](https://github.com/user-attachments/assets/8dd87a22-766b-4dbe-a312-ee5f9ee5982b)

## Funcionamiento general

### Agregar los cursos

Inicialmente, se deben cargar los cursos del año correspondiente a las solicitudes de inscripcion, esto puede hacerse manualmente o desde el archivo de cursos, en la seccion de Crear curso.

### Importar las solicitudes de inscripcion tardia

Luego de tener disponibles los cursos, se debe subir el archivo de solicitudes de inscripcion tardia en la seccion Importar inscripciones.
De darse un problema con alguna de las inscripciones, se mostrara una seccion especificando cuales no pudieron cargarse y sus razones
para que se vuelva a intentar una vez resueltos los problemas con el archivo.

### Crear inscripciones
Teniendo ya disponibles los cursos y las solicitudes, se debe ir a la seccion de Inscripciones para seleccionar y admitir las inscripciones tardias seleccionandolas.

Si al seleccionar la inscripcion, esta en verde, significa que se esta asignando al curso correspondiente a la opcion 1.
 
Si al seleccionar la inscripcion, esta en amarillo, significa que se esta asignando al curso correspondiente a la opcion 2.

![imagen](https://github.com/user-attachments/assets/748ea28d-5a9a-4cc3-9291-d1c0008bf16f)

### Exportar inscripciones
Una vez admitidas las inscripciones tardias, se debe diriguir a la seccion de Exportar inscripciones, donde podra filtrar y seleccionar inscripciones tardias 
cargadas en la base de datos, para poder exportarlas en formato de hoja de calculo.

![imagen](https://github.com/user-attachments/assets/087f8ed4-2b1c-43c1-9c56-931b00daad62)

# Informacion general para el uso de React

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
