import clientPromise from "../../../../lib/dbConnect";
import { ObjectId } from 'mongodb'

const dbName = "BrewCrew";
const collectionName = "projects";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(dbName);

        if (req.method === "GET") {
            let findQuery = {};
 
            if (req.query.pid) {
                findQuery._id = new ObjectId(req.query.pid);
            }
    
            const projects = await db
                .collection(collectionName)
                .find(findQuery)
                .toArray();
     
            res.json(projects);
        } else if (req.method === "POST") {
            const updatedProject = JSON.parse(req.body);
            
            const update = await db
                .collection(collectionName)
                .updateOne({
                    _id: new ObjectId(updatedProject._id)
                }, {
                    $set: {
                        name: updatedProject.name,
                        goal: updatedProject.goal,
                    }
                }, {
                    upsert: true
                });

            res.json(update);
        } else if (req.method === "DELETE") {
            const updatedProject = JSON.parse(req.body);
            
            const update = await db
                .collection(collectionName)
                .deleteOne({
                    _id: new ObjectId(updatedProject._id)
                });

            res.json(update);
        }

        
    } catch (e) {
        console.error(e);
    }
 };