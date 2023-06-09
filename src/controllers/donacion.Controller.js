import { getConnection ,sql} from "../database";


export const getDonaciones = async (req,res) =>{
    const pool =await getConnection();
    const result=await pool.request().query("SELECT * FROM Donacion");
    console.log(result);
    res.json(result.recordset);

};

  export const getDonacionById = async (req, res) => {
    const {id}=req.params;
     const pool=await getConnection();
     const result=await pool
     .request()
     .input("id",id)
     .query("SELECT * FROM Donacion Where id = @Id");
     res.send(result.recordset[0]);
  };
  export const createNewDonacion = async (req, res) => {
    const { descripcion, recibida,tipoBenefactor,tipoDonacion,fecha} = req.body;

    let { campanaId,benefactorId,cantidad,recolectorId } = req.body;
    
    if (campanaId == null || cantidad == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    if (benefactorId == null) benefactorId = 0;
  
    try {
      const pool = await getConnection();
  
      await pool
        .request()
        .input("campanaId", sql.Int, campanaId)
        .input("benefactorId", sql.Int, benefactorId)
        .input("cantidad", sql.Int, cantidad)
        .input("descripcion", sql.VarChar, descripcion)
        .input("recibida", sql.Int, recibida)
        .input("tipoBenefactor", sql.Int, tipoBenefactor)
        .input("tipoDonacion", sql.VarChar, tipoDonacion)
        .input("fecha", sql.DateTime, fecha)
        .input("recolectorId", sql.Int, recolectorId)
        .query("INSERT INTO [AsilosAncianos].[dbo].[Donacion] (campanaId, benefactorId, cantidad,descripcion,recibida,tipoBenefactor,tipoDonacion,fecha,recolectorId) VALUES (@campanaId,@benefactorId,@cantidad,@descripcion,@recibida,@tipoBenefactor,@tipoDonacion,@fecha,@recolectorId);");
  
      res.json({ campanaId, benefactorId, cantidad,descripcion,recibida,tipoBenefactor,tipoDonacion, fecha,recolectorId});
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const deleteDonacionById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM [AsilosAncianos].[dbo].[Donacion] WHERE Id= @Id");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const updateDonacionById = async (req, res) => {
    const { campanaId,benefactorId, cantidad,descripcion,recibida,tipoBenefactor,tipoDonacion,fecha,recolectorId} = req.body;
    
    const {id}=req.params;
  
    if (descripcion == null ||  tipoBenefactor == null || tipoDonacion == null || fecha == null || campanaId==null || benefactorId==null || cantidad==null || recolectorId==null ) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("campanaId", sql.Int, campanaId)
        .input("benefactorId", sql.Int, benefactorId)
        .input("cantidad", sql.Int, cantidad)
        .input("descripcion", sql.VarChar, descripcion)
        .input("recibida", sql.Bit, recibida)
        .input("tipoBenefactor", sql.Int, tipoBenefactor)
        .input("tipoDonacion", sql.VarChar, tipoDonacion)
        .input("fecha", sql.DateTime, fecha)
        .input("recolectorId", sql.Int, recolectorId)
        .input("id", sql.Int,id)
        .query("UPDATE [AsilosAncianos].[dbo].[Donacion] SET campanaId = @campanaId, benefactorId = @benefactorId, cantidad = @cantidad , descripcion = @descripcion ,recibida = @recibida , tipoBenefactor = @tipoBenefactor, tipoDonacion = @tipoDonacion,fecha = @fecha,recolectorId = @recolectorId WHERE Id = @id");
      res.json({ campanaId, benefactorId, cantidad, descripcion,recibida,tipoBenefactor,tipoDonacion,fecha,recolectorId});
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };