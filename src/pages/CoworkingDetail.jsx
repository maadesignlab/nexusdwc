import { useParams } from "react-router-dom";

function CoworkingDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalle del sitio de coworking</h1>
      <p>ID del sitio: {id}</p>
    </div> 
  )
}
export default CoworkingDetail;