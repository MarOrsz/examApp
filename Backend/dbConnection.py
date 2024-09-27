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



# m = MetaData()

# t = Table('ROLLBRUSH', m,
#           Column('brushId', String, primary_key=True),
#           Column('toc', DateTime),
#           Column('tom', DateTime),
#           Column('mop', String)
#           )

# stmt = select(t.c.mop).where(t.c.brushId > '0')

# connection = engine.connect()

# results = connection.execute(stmt).fetchall()

# for res in results:
#     print(res)