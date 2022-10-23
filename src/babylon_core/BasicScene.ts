import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
    Texture, CubeTexture, PBRMaterial, Color3, GlowLayer, SceneLoader
} from "@babylonjs/core";
import "@babylonjs/loaders"

export class BasicScene{

    scene: Scene;
    engine: Engine;

    constructor(private canvas: HTMLCanvasElement) {

        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();
        this.ConfigCamera();
        this.CreateMineModel();
        // this.CreateEnvironment();
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })


    }


    CreateScene():Scene {
        const scene = new Scene(this.engine);

        const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0,1,0), scene);
        hemisphericLight.intensity = 0;
        return scene;
    }


    ConfigCamera():void{
        const camera = new FreeCamera("camera", new Vector3(0,-100,0), this.scene);

        camera.attachControl();
        camera.speed=1.5;
        camera.attachControl(this.canvas, true);
        camera.keysUpward.push(32); //increase elevation
        camera.keysDownward.push(17); //decrease elevation
        camera.keysUp.push(87); //forwards
        camera.keysDown.push(83); //backwards
        camera.keysLeft.push(65);
        camera.keysRight.push(68);
        camera.maxZ=0;


    }

    CreateEnvironment():void{
        const environmentTexture = CubeTexture.CreateFromPrefilteredData("./environments/environment.env", this.scene);
        this.scene.environmentTexture = environmentTexture;
        this.scene.createDefaultSkybox(environmentTexture, true,10000);
        // this.scene.environmentIntensity = 0.5;
    }

    async CreateMineModel():Promise<void>{
        // SceneLoader.ImportMesh("", "./models/","paradise_quarry_low.glb", this.scene, (meshes)=>{
        //     console.log("Meshes", meshes);
        // })

        const {meshes} = await SceneLoader.ImportMeshAsync("", "./models/",
            "paradise_quarry_low.glb", this.scene);
        console.log("meshes ", meshes);
    }

}