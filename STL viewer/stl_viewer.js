carrega_stl('colored.stl', window.innerWidth/2, window.innerHeight/2);
function carrega_stl(peca_stl, T_janela_X, T_janela_Y){
	if ( ! Detector.webgl ) 
		Detector.addGetWebGLMessage();
	var container, stats;
	var camera, cameraTarget, scene, renderer;
	init();
	animate();
	function init() {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		camera = new THREE.PerspectiveCamera( 35, T_janela_X / T_janela_Y, 1, 15 );
		camera.position.set( 3, 0.15, 3 );
		cameraTarget = new THREE.Vector3( 0, -0.25, 0 );
		scene = new THREE.Scene();
		//scene.background = new THREE.Color( 0x000000 );
		//scene.fog = new THREE.Fog(0xffffff, 2, 15 );
		// Ground
		/*var plane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry( 40, 40 ),
			new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
		);
		plane.rotation.x = -Math.PI/2;
		plane.position.y = -0.5;
		scene.add( plane );
		plane.receiveShadow = true;*/
		//se for ASCII mudar a var material
		var loader = new THREE.STLLoader();
		/*
		loader.load( 'engrenagem.stl', function ( geometry ) {
			var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, - 0.25, 0.6 );
			mesh.rotation.set( 0, - Math.PI / 2, 0 );
			mesh.scale.set( 0.05, 0.05, 0.05 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );*/
		// Binary files
		loader.load( peca_stl, function ( geometry ) {	
			var material = new THREE.MeshPhongMaterial( { color: 0x000099, specular: 0x111111, shininess: 200 } );
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 0, -0.27*0, 0);
			mesh.rotation.set( - Math.PI / 2, 0, 0 );
			mesh.scale.set(0.2, 0.2, 0.2 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			scene.add( mesh );
		} );
		// Lights
		scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
		addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
		addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );
		// renderer
		renderer = new THREE.WebGLRenderer( { antialias: true , alpha: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize(  T_janela_X , T_janela_Y );
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.renderReverseSided = false;
		container.appendChild( renderer.domElement );
		// stats
		//stats = new Stats();
		//container.appendChild( stats.dom );
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function addShadowedLight( x, y, z, color, intensity ) {
		var directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z );
		scene.add( directionalLight );
		directionalLight.castShadow = false;
		var d = 1;
		directionalLight.shadow.camera.left = -d;
		directionalLight.shadow.camera.right = d;
		directionalLight.shadow.camera.top = d;
		directionalLight.shadow.camera.bottom = -d;
		directionalLight.shadow.camera.near = 1;
		directionalLight.shadow.camera.far = 4;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		directionalLight.shadow.bias = -0.005;
	}
	function onWindowResize() {
		camera.aspect =  T_janela_X / T_janela_Y;
		camera.updateProjectionMatrix();
		renderer.setSize(T_janela_X , T_janela_Y);
	}
	function animate() {
		requestAnimationFrame( animate );
		render();
		//stats.update();
	}
	function render() {
		var timer = Date.now() * 0.0005;
		camera.position.x = Math.cos( timer ) * 3;
		camera.position.z = Math.sin( timer ) * 2.5;
		camera.lookAt( cameraTarget );
		renderer.render( scene, camera );
	}
}
