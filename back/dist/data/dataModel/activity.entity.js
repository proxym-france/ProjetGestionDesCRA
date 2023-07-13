"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityDB = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const cra_entity_1 = require("./cra.entity");
const project_entity_1 = require("./project.entity");
let ActivityDB = exports.ActivityDB = class ActivityDB {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActivityDB.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ActivityDB.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ActivityDB.prototype, "matin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserDB),
    __metadata("design:type", user_entity_1.UserDB)
], ActivityDB.prototype, "collab", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectDB),
    __metadata("design:type", project_entity_1.ProjectDB)
], ActivityDB.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cra_entity_1.CRADB, cra => cra.activities),
    __metadata("design:type", cra_entity_1.CRADB)
], ActivityDB.prototype, "cra", void 0);
exports.ActivityDB = ActivityDB = __decorate([
    (0, typeorm_1.Entity)('activity')
], ActivityDB);
//# sourceMappingURL=activity.entity.js.map