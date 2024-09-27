from sqlalchemy import create_engine, Table, MetaData, Column, String, DateTime, select

from sqlalchemy.ext.automap import automap_base


engine = create_engine("mssql+pymssql://prdb:a423pa@localhost:1433/PRDB_NovelisPindaHMA")


Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)


for cl in Base.classes :
    print (Base.classes)

pdi = Base.classes.PRIMARYDATA

stmt = select(pdi.slabThickness).where(pdi.meId > 0)

connection = engine.connect()

results = connection.execute(stmt).fetchall()

for res in results:
    print(res)



