import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
    Texture
} from "@babylonjs/core";

export class BasicScene{

    scene: Scene;
    engine: Engine;

    constructor(private canvas: HTMLCanvasElement) {

        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })

    }

    CreateScene():Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(0,2,-5), this.scene);

        camera.attachControl();
        camera.speed=0.25;
        camera.attachControl(this.canvas, true);
        camera.keysUpward.push(69); //increase elevation
        camera.keysDownward.push(81); //decrease elevation
        camera.keysUp.push(87); //forwards
        camera.keysDown.push(83); //backwards
        camera.keysLeft.push(65);
        camera.keysRight.push(68);

        const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0,1,0), this.scene);
        hemisphericLight.intensity = 0.75;

        const ground = MeshBuilder.CreateGround("ground", {width:10, height:10}, this.scene);

        const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, this.scene);
        ball.position = new Vector3(0,1,0);

        ground.material = this.CreateGroundMaterial();
        ball.material = this.CreateBallMaterial();

        return scene;
    }

    CreateGroundMaterial():StandardMaterial{
        const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
        const uvScale = 1;
        const textureArray:Texture[] = [];

        const diffuseTexture = new Texture("./textures/stone/floor_klinkers_01_diff_4k.jpg", this.scene);
        groundMaterial.diffuseTexture = diffuseTexture;
        textureArray.push(diffuseTexture);

        const normalTexture = new Texture("./textures/stone/floor_klinkers_01_nor_gl_4k.jpg", this.scene);
        groundMaterial.bumpTexture = normalTexture;
        textureArray.push(normalTexture);

        const aoTexture = new Texture("./textures/stone/floor_klinkers_01_ao_4k.jpg", this.scene);
        groundMaterial.ambientTexture = aoTexture;
        textureArray.push(aoTexture);

        const specularTexture = new Texture("./textures/stone/floor_klinkers_01_spec_4k.jpg", this.scene);
        groundMaterial.specularTexture = specularTexture;
        textureArray.push(specularTexture);

        textureArray.forEach((texture)=>{
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        })

        return groundMaterial;
    }

    CreateBallMaterial():StandardMaterial{

        const ballMaterial = new StandardMaterial("groundMaterial", this.scene);
        const uvScale = 3;
        const textureArray:Texture[] = [];

        const diffuseTexture = new Texture("./textures/metal/metal_grate_rusty_diff_4k.jpg", this.scene);
        ballMaterial.diffuseTexture = diffuseTexture;
        textureArray.push(diffuseTexture);

        const normalTexture = new Texture("./textures/metal/metal_grate_rusty_nor_gl_4k.jpg", this.scene);
        ballMaterial.bumpTexture = normalTexture;
        ballMaterial.invertNormalMapX = true;
        ballMaterial.invertNormalMapY = true;
        textureArray.push(normalTexture);

        const aoTexture = new Texture("./textures/metal/metal_grate_rusty_ao_4k.jpg", this.scene);
        ballMaterial.ambientTexture = aoTexture;
        textureArray.push(aoTexture);

        const specularTexture = new Texture("./textures/metal/metal_grate_rusty_rough_4k.jpg", this.scene);
        ballMaterial.specularTexture = specularTexture;
        // ballMaterial.specularPower = 10;
        textureArray.push(specularTexture);

        textureArray.forEach((texture)=>{
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        })

        return ballMaterial;

    }


}