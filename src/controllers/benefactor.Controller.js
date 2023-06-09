import { getConnection ,sql} from "../database";


export const getBenefactor = async (req,res) =>{
    const pool =await getConnection();
    const result=await pool.request().query("SELECT * FROM Benefactor");
    console.log(result);
    res.json(result.recordset);

};

  export const getBenefactorById = async (req, res) => {
    const {id}=req.params;
     const pool=await getConnection();
     const result=await pool
     .request()
     .input("id",id)
     .query("SELECT * FROM Benefactor Where id = @Id");
     res.send(result.recordset[0]);
  };
  export const createNewBenefactor = async (req, res) => {
    const { nombres, apellidos,carnet,dirreccion,email} = req.body;

    let {latitud,longitud,telefono,celular } = req.body;
    
    if (nombres == null || carnet == null) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
  
      await pool
        .request()
        .input("nombres", sql.VarChar, nombres)
        .input("apellidos", sql.VarChar, apellidos)
        .input("carnet", sql.VarChar, carnet)
        .input("latitud", sql.Float, latitud)
        .input("longitud", sql.Float, longitud)
        .input("dirreccion", sql.VarChar, dirreccion)
        .input("email", sql.VarChar, email)
        .input("telefono", sql.Int, telefono)
        .input("celular", sql.Int, celular)
        .query("INSERT INTO [AsilosAncianos].[dbo].[Benefactor] (nombres, apellidos, carnet,latitud,longitud,dirreccion,email,telefono,celular) VALUES (@nombres,@apellidos,@carnet,@latitud,@longitud,@dirreccion,@email,@telefono,@celular);");
  
      res.json({ nombres, apellidos, carnet,latitud,longitud,dirreccion,email, telefono,celular});
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const deleteBenefactorById = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query("DELETE FROM [AsilosAncianos].[dbo].[Benefactor] WHERE Id= @Id");
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      return res.sendStatus(204);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const updateBenefactorById = async (req, res) => {
    const {nombres, apellidos,carnet,direccion,email,latitud,longitud,telefono,celular} = req.body;
    
    const {id}=req.params;
  
    if (nombres == null || carnet == null ||  apellidos == null || latitud == null || longitud == null || direccion == null  || email==null || telefono==null || celular==null ) {
      return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
    }
  
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("nombres", sql.VarChar, nombres)
        .input("apellidos", sql.VarChar, apellidos)
        .input("carnet", sql.VarChar, carnet)
        .input("latitud", sql.Float, latitud)
        .input("longitud", sql.Float, longitud)
        .input("direccion", sql.VarChar, direccion)
        .input("email", sql.VarChar, email)
        .input("telefono", sql.Int, telefono)
        .input("celular", sql.Int, celular)
        .input("id", sql.Int,id)
        .query("UPDATE [AsilosAncianos].[dbo].[Benefactor] SET nombres = @nombres, apellidos = @apellidos, carnet = @carnet , latitud = @latitud ,longitud = @longitud , direccion = @direccion, email = @email,telefono = @telefono,celular = @celular WHERE Id = @id");
      res.json({nombres, apellidos,carnet,latitud,longitud,direccion,email,telefono,celular });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };