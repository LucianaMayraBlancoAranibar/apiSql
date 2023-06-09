import { getConnection ,sql} from "../database";


export const getCampanas = async (req,res) =>{
    const pool =await getConnection();
    const result=await pool.request().query("SELECT * FROM CAMPANA");
    console.log(result);
    res.json(result.recordset);

};

  
  export const getCampanaById = async (req, res) => {
    const {id}=req.params;
     const pool=await getConnection();
     const result=await pool
     .request()
     .input("id",id)
     .query("SELECT * FROM Campana Where id = @Id");
     res.send(result.recordset[0]);
  };
  
  export const deleteCampanaById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM [AsilosAncianos].[dbo].[Campana] WHERE Id= @Id");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const updateCampanaById = async (req, res) => {
    const { nombre, requerimiento, fechaInicio,fechaCierre, tipoCampaña,establecimientoID,estado} = req.body;
    const {id}=req.params;
  
    // validating
    if (nombre == null || requerimiento == null || fechaInicio == null || fechaCierre == null || tipoCampaña == null || establecimientoID==null || estado==null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("nombre", sql.VarChar, nombre)
        .input("requerimiento", sql.VarChar, requerimiento)
        .input("fechaInicio", sql.DateTime, fechaInicio)
        .input("fechaCierre", sql.DateTime, fechaCierre)
        .input("tipoCampaña", sql.Text, tipoCampaña)
        .input("establecimientoID", sql.Int, establecimientoID)
        .input("estado", sql.Int, estado)
        .input("id", sql.Int,id)
        .query("UPDATE [AsilosAncianos].[dbo].[Campana] SET nombre = @nombre, requerimiento = @requerimiento, fechaInicio = @fechaInicio , fechaCierre = @fechaCierre ,tipoCampaña = @tipoCampaña , establecimientoID = @establecimientoID, estado = @estado WHERE Id = @id");
      res.json({ nombre, requerimiento, fechaInicio, fechaCierre,tipoCampaña,establecimientoID,estado});
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };