import {
    Scene,
    Engine,
    FreeCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
    Texture, CubeTexture, PBRMaterial, Color3, GlowLayer
} from "@babylonjs/core";

export class BasicScene{

    scene: Scene;
    engine: Engine;

    constructor(private canvas: HTMLCanvasElement) {

        this.engine = new Engine(this.canvas, true);
        this.scene = this.CreateScene();
        this.ConfigCamera();
        this.CreateEnvironment();
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        })

    }

    CreateScene():Scene {
        const scene = new Scene(this.engine);

        const hemisphericLight = new HemisphericLight('hemisphericLight', new Vector3(0,1,0), scene);
        hemisphericLight.intensity = 0;
        const ground = MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);
        const ball = MeshBuilder.CreateSphere("ball", {diameter: 1}, scene);
        ball.position = new Vector3(0,1,0);
        ground.material = this.CreateAsphalt(scene);
        ball.material = this.CreateMagic(scene);

        return scene;
    }

    CreateGroundMaterial(scene: Scene):StandardMaterial{
        const groundMaterial = new StandardMaterial("groundMaterial", scene);
        const uvScale = 4;
        const textureArray:Texture[] = [];

        const diffuseTexture = new Texture("./textures/stone/floor_klinkers_01_diff_1k.jpg", scene);
        groundMaterial.diffuseTexture = diffuseTexture;
        textureArray.push(diffuseTexture);

        const normalTexture = new Texture("./textures/stone/floor_klinkers_01_nor_gl_1k.jpg", scene);
        groundMaterial.bumpTexture = normalTexture;
        textureArray.push(normalTexture);

        const aoTexture = new Texture("./textures/stone/floor_klinkers_01_ao_1k.jpg", scene);
        groundMaterial.ambientTexture = aoTexture;
        textureArray.push(aoTexture);

        const specularTexture = new Texture("./textures/stone/floor_klinkers_01_spec_1k.jpg", scene);
        groundMaterial.specularTexture = specularTexture;
        textureArray.push(specularTexture);

        textureArray.forEach((texture)=>{
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        })

        return groundMaterial;
    }

    ConfigCamera():void{
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
    }

    CreateEnvironment():void{
        const environmentTexture = CubeTexture.CreateFromPrefilteredData("./environments/environment.env", this.scene);
        this.scene.environmentTexture = environmentTexture;
        this.scene.createDefaultSkybox(environmentTexture, true);
        this.scene.environmentIntensity = 0.5;

    }

    CreateBallMaterial(scene: Scene):StandardMaterial{

        const ballMaterial = new StandardMaterial("groundMaterial", scene);
        const uvScale = 2;
        const textureArray:Texture[] = [];

        const diffuseTexture = new Texture("./textures/metal/metal_grate_rusty_diff_1k.jpg", scene);
        ballMaterial.diffuseTexture = diffuseTexture;
        textureArray.push(diffuseTexture);

        const normalTexture = new Texture("./textures/metal/metal_grate_rusty_nor_gl_1k.jpg", scene);
        ballMaterial.bumpTexture = normalTexture;
        ballMaterial.invertNormalMapX = true;
        ballMaterial.invertNormalMapY = true;
        textureArray.push(normalTexture);

        const aoTexture = new Texture("./textures/metal/metal_grate_rusty_ao_1k.jpg", scene);
        ballMaterial.ambientTexture = aoTexture;
        textureArray.push(aoTexture);

        const specularTexture = new Texture("./textures/metal/metal_grate_rusty_rough_1k.jpg", scene);
        ballMaterial.specularTexture = specularTexture;
        // ballMaterial.specularPower = 10;
        textureArray.push(specularTexture);

        textureArray.forEach((texture)=>{
            texture.uScale = uvScale;
            texture.vScale = uvScale;
        })

        return ballMaterial;

    }

    CreateAsphalt(scene: Scene): PBRMaterial{
        const pbr = new PBRMaterial("pbr", scene);
        pbr.albedoTexture = new Texture("./textures/concrete/hexagonal_concrete_paving_diff_1k.jpg", scene);
        pbr.bumpTexture = new Texture("./textures/concrete/hexagonal_concrete_paving_nor_gl_1k.jpg", scene);
        pbr.metallicTexture = new Texture("./textures/concrete/hexagonal_concrete_paving_arm_1k.jpg");
        pbr.invertNormalMapY = true;
        pbr.invertNormalMapX = true;
        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true;

        return pbr
    }

    CreateMagic(scene:Scene):PBRMaterial{
        const pbr = new PBRMaterial("pbr", scene);
        pbr.albedoTexture = new Texture("./textures/floral_metal/FloralDesignTinWall_basecolor.png", scene);
        pbr.bumpTexture = new Texture("./textures/floral_metal/FloralDesignTinWall_normal.png", scene);
        pbr.metallicTexture = new Texture("./textures/floral_metal/FloralDesignTinWall_metallic.png");
        pbr.emissiveTexture = new Texture("./textures/floral_metal/FloralDesignTinWall_emissive.png");
        pbr.emissiveColor = new Color3(1,1,1);

        pbr.invertNormalMapY = true;
        pbr.invertNormalMapX = true;
        pbr.useAmbientOcclusionFromMetallicTextureRed = true;
        pbr.useRoughnessFromMetallicTextureGreen = true;
        pbr.useMetallnessFromMetallicTextureBlue = true;
        pbr.roughness = 1;
        pbr.emissiveIntensity = 1;
        const glowLayer = new GlowLayer("glow",scene);
        glowLayer.intensity = 4;

        return pbr
    }



}