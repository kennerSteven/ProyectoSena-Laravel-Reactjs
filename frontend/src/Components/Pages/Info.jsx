// import { Accordion, AccordionTab } from "primereact/accordion";
// import perfilCrear from "../../assets/ImgInfo/CrearPerfil.png";
// import crearPerfilCampos from "../../assets/ImgInfo/crearPerfilCampos.png";
// import FormCrearAprendiz from "../../assets/ImgInfo/FormCrearAprendiz.png";
// import CrearFicha from "../../assets/ImgInfo/CrearFicha.png";
// import AdvertenciaEliminarTodasFicha from "../../assets/ImgInfo/AdvertenciaEliminarTodasFicha.png";
// import AprendicesVinculadosFormacion from "../../assets/ImgInfo/AprendicesVinculadosFormacion.png";
// import BarraHerramientas from "../../assets/ImgInfo/BarraHerramientas.png";

// import EliminarFichaConAprendices from "../../assets/ImgInfo/EliminarFichaConAprendices.png";

// import OpcionDesactivarFormacion from "../../assets/ImgInfo/OpcionDEsativarFormacion.png";
// import OpcionEditarFormacion from "../../assets/ImgInfo/OpcionEditarFormacion.png";
// import TablaFichasDesactivadas from "../../assets/ImgInfo/TablaFichasDesactivadas.png";
// import TablaGeneralFormaciones from "../../assets/ImgInfo/TablaGeneralFormaciones.png";

// export default function Info() {
//   return (
//     <div className="mx-auto mt-2" style={{ width: "1400px" }}>
//       <Accordion activeIndex={0}>
//         <AccordionTab
//           header="Crear usuarios"
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             paddingRight: "1rem",
//           }}
//         >
//           <div className="container py-3">
//             <h2>Creación de usuarios</h2>
//             <p className="mb-4">
//               Para la creación de usuarios — ya sean{" "}
//               <strong>
//                 visitantes, aprendices, instructores o administrativos
//               </strong>{" "}
//               — es obligatorio crear primero un perfil. Este perfil se crea
//               desde la parte superior derecha de la tabla correspondiente a cada
//               entidad.
//             </p>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p className="mb-0">
//                   Por ejemplo, si deseamos registrar un aprendiz, primero
//                   debemos crear el perfil llamado <strong>Aprendiz</strong>,
//                   incluyendo una descripción adecuada.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={perfilCrear}
//                   alt="Botón para crear perfil"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={crearPerfilCampos}
//                   alt="Campos para crear perfil"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p className="mb-0">
//                   Luego de completar los campos, hacemos clic en{" "}
//                   <strong>Guardar</strong> y el perfil será creado. Con esto ya
//                   podremos registrar un nuevo aprendiz desde el formulario
//                   correspondiente.
//                 </p>
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p className="mb-0">
//                   El botón para abrir el formulario de creación de usuario se
//                   encuentra también en la parte superior de la tabla. Está
//                   representado por un ícono de <strong>+</strong>, indicando la
//                   acción de agregar un nuevo usuario.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={FormCrearAprendiz}
//                   alt="Formulario de creación de aprendiz"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={crearPerfilCampos}
//                   alt="Botón de creación de usuario"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p className="mb-0">
//                   Este proceso se repite para todas las entidades del sistema:{" "}
//                   <strong>
//                     visitantes, aprendices, instructores y administrativos
//                   </strong>
//                   . Es decir, siempre se debe crear un perfil antes de registrar
//                   al usuario.
//                 </p>
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p className="mb-0">
//                   <strong>Consideraciones para aprendices:</strong> el aprendiz
//                   debe estar asociado a una formación. Para ello, en la barra de
//                   herramientas de la tabla de aprendices (identificada con un
//                   ícono naranja), podemos hacer clic para abrir una ventana
//                   emergente. Allí se nos solicitará el{" "}
//                   <strong>
//                     nombre del programa, número de ficha y jornada
//                   </strong>{" "}
//                   de la formación.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={CrearFicha}
//                   alt="Formulario de creación de ficha"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <p className="mt-4">
//               Este es el último paso adicional requerido para registrar
//               correctamente un aprendiz en el sistema.
//             </p>
//           </div>
//         </AccordionTab>

//         <AccordionTab
//           header="Formaciones"
//           style={{
//             maxHeight: "70vh",
//             overflowY: "auto",
//             paddingRight: "1rem",
//           }}
//           className="menuLink"
//         >
//           <div className="container py-3">
//             <h2 className="mb-4">Gestión de Formaciones</h2>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p>
//                   En el menú lateral izquierdo, al hacer clic en la opción{" "}
//                   <strong>Formaciones</strong>, accedemos al módulo de gestión
//                   de fichas. Inicialmente se muestra una tabla general con todas
//                   las formaciones registradas.
//                 </p>
//                 <p>
//                   Esta tabla incluye información como el{" "}
//                   <strong>nombre del programa</strong>,{" "}
//                   <strong>código de ficha</strong>, <strong>jornada</strong> y{" "}
//                   <strong>estado</strong> de la formación.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={TablaGeneralFormaciones}
//                   alt="Tabla general de formaciones"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={AprendicesVinculadosFormacion}
//                   alt="Aprendices vinculados a la formación"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   Al seleccionar una ficha específica, se despliega la lista de{" "}
//                   <strong>aprendices vinculados</strong> a esa formación.
//                 </p>
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p>
//                   También disponemos de la opción{" "}
//                   <strong>Desactivar formación</strong>, indicada con un ícono
//                   naranja de advertencia. Esta acción se utiliza cuando la
//                   formación ha finalizado su etapa lectiva.
//                 </p>
//                 <p>
//                   Al desactivarla, la ficha pasa al estado{" "}
//                   <strong>inactivo</strong> y se traslada a una tabla separada.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={OpcionDesactivarFormacion}
//                   alt="Opción para desactivar formación"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={OpcionEditarFormacion}
//                   alt="Opción para editar formación"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   La opción <strong>Editar ficha</strong> permite corregir
//                   errores en el nombre del programa, número de ficha o jornada.
//                 </p>
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p>
//                   En la parte superior del módulo, se encuentra una{" "}
//                   <strong>barra de herramientas</strong> con accesos rápidos:
//                 </p>
//                 <ul>
//                   <li>
//                     Ícono naranja: acceso a la tabla de{" "}
//                     <strong>formaciones desactivadas</strong>.
//                   </li>
//                   <li>
//                     Ícono azul: acceso rápido para{" "}
//                     <strong>crear una nueva formación</strong>.
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={BarraHerramientas}
//                   alt="Barra de herramientas de formaciones"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <h3 className="mb-3">Formaciones Desactivadas</h3>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={TablaFichasDesactivadas}
//                   alt="Tabla de fichas desactivadas"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   En esta sección se muestran las fichas que han finalizado su
//                   etapa lectiva y están en estado <strong>inactivo</strong>.
//                   Desde aquí se pueden administrar las fichas de forma
//                   individual o masiva.
//                 </p>
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6">
//                 <p>
//                   La opción <strong>Eliminar todas</strong> permite borrar todas
//                   las fichas inactivas junto con los aprendices asociados. Esta
//                   acción debe ejecutarse con precaución.
//                 </p>
//               </div>
//               <div className="col-md-6 text-center">
//                 <img
//                   src={AdvertenciaEliminarTodasFicha}
//                   alt="Advertencia al eliminar todas las fichas"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//             </div>

//             <div className="row align-items-center mb-4">
//               <div className="col-md-6 text-center">
//                 <img
//                   src={EliminarFichaConAprendices}
//                   alt="Eliminar ficha con aprendices asociados"
//                   className="img-fluid rounded shadow-sm"
//                 />
//               </div>
//               <div className="col-md-6">
//                 <p>
//                   También es posible eliminar fichas de forma individual, con la
//                   opción de visualizar los aprendices asociados antes de
//                   confirmar la eliminación.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </AccordionTab>
//         <AccordionTab header="Creación de usuarios"></AccordionTab>
//       </Accordion>
//     </div>
//   );
// }
