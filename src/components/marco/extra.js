// Verdadero query:
// Background {
//   localFiles {
//     colors {
//       ...GatsbyImageColors
//     }
//     childImageSharp {
//       fluid(quality: 90, maxWidth: 2500) {
//         ...GatsbyImageSharpFluid
//       }
//     }
//   }
// }

// {
//   /* {
//         edges.map((({node: { data: edge }}), i) => (
//           <div data-depth={Depth} key={i}>
//             <Img fixed={edge.Image.childImageSharp.fixed} />
//           </div>
//         ))
//       } */
// }
// {
//   /* {edges.map(({ node: { data: { Image, Depth } } }, i) => (
//         <div data-depth={Depth} key={i}>
//           <h1>Hola</h1>
//           <img alt="" src={Image[0].url}  />
//         </div>
//       ))} */
// }
