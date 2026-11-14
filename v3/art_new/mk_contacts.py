import sys,pickle
from build_sheets import items,contact
SH={'eden':('583c3088',16),'back':('a3eaea54',0),'f1':('eb43af43',0),'f2':('7ab83cae',0),'f3':('dbee9d83',0)}
R={}
for k,(f,m) in SH.items():
    rows=items('/mnt/user-data/attachments/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/%s-image.png'%f,m)
    flat=contact(rows,'/tmp/ct_%s.png'%k);R[k]=[(q['img'],q['y'],q['x']) for q in flat];print(k,len(flat))
pickle.dump(R,open('/tmp/ct.pkl','wb'))
