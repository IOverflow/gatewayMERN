/**
 * Common class for every service that 
 * can interacts with a db.
 * 
 * It provides a basic implementation of 
 * the services that every Entity will need.
 */

import GatewayModel from "../models/gatewayModel";

export default class DataAccessService {
    constructor(
        // Dependency injected repository to query
        // data from. It is a Model in most cases,
        // but could be used to pass a mock repository
        // for testing, for example.
        repository
    ) {
        this._repository = repository;
        this.add = this.add.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    /**
     * Fetch all entities in the db.
     * 
     * If passed @selectParams or @whereParams then
     * the resulted entities will contain only the fields
     * listed in @selectedParams and will match conditions
     * in whereParams.
     * 
     * If includables is passed, then the requested
     * fields will be populated (Used for accessing related data).
     * 
     * @param selectParams 
     * @param whereParams 
     * @param includables
     */
    async getAll(callback, { selectParams, whereParams, includables} = {}) {
        let query = this._repository.find();

        console.log(await GatewayModel.find().populate("devices"));

         if (includables)
             query = query.populate(includables);

        if (selectParams)
            query = query.select(selectParams);

        if (whereParams)
            query = query.where(whereParams);
        
        if (includables)
            console.log(includables);

        query.exec(callback);
    }

    /**
     * Fetch the entity in the db that has
     * id @id.
     * 
     * If passed @selectParams or @whereParams then
     * the resulted entities will contain only the fields
     * listed in @selectedParams and will match conditions
     * in whereParams.
     * 
     * If includables is passed, then the requested
     * fields will be populated (Used for accessing related data).
     * 
     * @param id id of the requested Entity.
     * @param callback function to execute once the query is completed.
     * @param selectParams object with fields to select.
     * @param whereParams object with filters to apply.
     * @param includables objects with fields to include (for related data)
     */
    getById(id, callback, { selectedParams, includables } = {}) {
        let query = this._repository.findById(id);

        if (includables)
            query = query.populate(includables);

        if (selectedParams)
            query = query.select(selectedParams);

        query.exec(callback);
    }

    update(entity, callback) {
        this._repository.findOneAndUpdate({
            _id: entity._id
        }, entity, callback);
    }

    remove(entity, callback) {
        this._repository.findByIdAndRemove(entity, callback);
    }

    add(entity, callback) {
        this._repository.create(entity, callback);
    }
}