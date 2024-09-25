<script>
	import { tweened } from "svelte/motion";
	import { cubicIn } from "svelte/easing";
	import { draw } from "svelte/transition";
	import { onMount } from "svelte";

	export let step;

	const fullW = 1573;
	const w = 1030;
	const h = 872;
	const drawParams = { duration: 2500, easing: cubicIn };

	let pathEl;
	let pathLength;
	let strokeOffset;

	const viewBox = tweened([fullW - w, 0, w / 5, h / 5], {
		duration: 1000,
		easing: cubicIn
	});

	const stepChange = () => {
		strokeOffset = -1 * pathLength * (1 - step / 5);
		if (step === 0 || step === 1) {
			$viewBox = [fullW - w, 0, w / 5, h / 5];
		} else {
			$viewBox = [fullW - w, 0, w / (6 - step), h / (6 - step)];
		}
	};

	$: step, stepChange();

	onMount(() => {
		pathLength = pathEl.getTotalLength() - (fullW - w);
		strokeOffset = -1 * pathLength;
	});
</script>

<div class="maze">
	<svg
		id="intro-maze"
		width="100%"
		height="100%"
		viewBox={$viewBox.join(" ")}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle id="circle" cx="1536.04" cy="860.942" r="10.2581" fill="#6B50DC" />
		<path
			bind:this={pathEl}
			style:stroke-dasharray={pathLength}
			style:stroke-dashoffset={strokeOffset}
			id="path"
			d="M1535.37 860.942V830.168H1442.37V782.297H1372.61V760.413H1346.62V782.297H1326.11V830.168H1301.49V782.297H1276.87V760.413H1208.48V782.297H1140.09V827.432H999.901L997.85 736.477H929.463V782.297H859.708V830.168H603.289V804.864H719.514V686.555H696.947V593.548H625.694V571.323H651.34V523.452H625.694V480.026V458.142L651.34 454.039V408.903H673.695V387.019V296.201V268.368H603.289V246.398H742.123V107.914H651.34V84.3208H625.694V152.537H557.735V14.5659H0"
			stroke="#6B50DC"
			stroke-width="5"
		/>
		<g id="walls">
			<path
				id="Vector"
				d="M1058.73 632.121V584.155"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_2"
				d="M1361.5 328.387C1361.5 328.387 1347.66 328.387 1337.87 328.387C1337.87 275.108 1266.26 281.82 1244.59 281.82H1198.58"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_3"
				d="M1337.87 358.173C1337.87 364.606 1338.43 367.682 1337.59 377.611C1335.63 398.587 1326.96 421.801 1291.3 421.801H1244.17H1221.23V444.735"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_4"
				d="M1384.58 374.675V398.308H1361.5L1355.35 351.741H1431.15V374.675H1407.79V398.308H1454.5V514.935H1431.15"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_5"
				d="M1198.72 421.521H1104.74"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_6"
				d="M1126.55 398.027H1149.91"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_7"
				d="M1080.96 421.661H987.402V445.014"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_8"
				d="M1104.6 514.936H1074.25"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_9"
				d="M1058.17 328.248V351.741V398.028"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_10"
				d="M964.886 328.108V258.468"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_11"
				d="M964.187 281.821H917.756H848.25C864.473 281.821 871.606 270.914 871.606 258.468"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_12"
				d="M708.399 281.822H754.83H824.196C807.973 281.822 800.841 270.914 800.841 258.469H778.185V211.902H801.4"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_13"
				d="M988.101 398.029V375.095"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_14"
				d="M882.374 538.288V445.014C882.374 424.738 904.191 421.661 941.531 421.661H964.886"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_15"
				d="M801.96 421.661H777.625V467.389"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_16"
				d="M1348.5 445.014V538.288C1348.5 558.565 1326.68 561.641 1289.34 561.641H1267.8"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_17"
				d="M1407.51 584.855V561.502C1370.31 561.502 1348.36 558.425 1348.36 538.148V445.014V421.661H1431.15"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_18"
				d="M1477.72 421.522V398.308H1571V584.855H1431.15V561.502H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_19"
				d="M1547.78 445.014V421.521H1501.07"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_20"
				d="M1501.07 491.581H1547.78V468.507H1477.72V445.014H1524.43"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_21"
				d="M1454.5 536.75H1547.78V514.935H1477.72V491.582"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_22"
				d="M1174.8 304.615V281.821H1104.74V188.967"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_23"
				d="M1081.38 281.821H1034.81V212.32H1011.46"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_24"
				d="M1011.32 281.821H964.187"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_25"
				d="M754.97 95.2739V258.468H615.119"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_26"
				d="M754.97 398.028V305.174"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_27"
				d="M731.755 281.821V375.094"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_28"
				d="M708.399 398.308V304.615"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_29"
				d="M731.894 421.661H708.399L685.044 467.389H638.474"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_30"
				d="M685.044 421.521L661.689 444.175V421.521H685.044Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_31"
				d="M684.904 491.162L661.689 513.816H638.474V491.721L684.904 491.162Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_32"
				d="M661.689 537.589V561.502H731.755"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_33"
				d="M731.755 561.502H801.68V536.89"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_34"
				d="M824.196 561.501H848.25H859.998H882.514"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_35"
				d="M1174.66 491.721V561.501H1104.74V538.288"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_36"
				d="M1163.75 561.502H1244.59V538.289"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_37"
				d="M1173.82 561.502C1196.9 562.061 1267.1 555.209 1267.1 608.348L1290.46 607.789V584.156"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_38"
				d="M1151.31 724.555V701.621H1173.26H1220.39C1272.98 701.621 1266.96 651.558 1266.96 631.701H1313.67V608.348H1337.03"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_39"
				d="M918.176 701.482H824.895"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_40"
				d="M1011.46 701.482V771.402V817.969H1128.09V724.695H1034.81V794.755H1104.74V748.049H1058.17V771.402H1081.38"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_41"
				d="M918.176 701.482H988.101"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_42"
				d="M988.101 701.482H1128.09"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_43"
				d="M1151.31 724.695V771.402H1198.3"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_44"
				d="M1174.1 817.968H1198.3V794.754H1151.31V841.321H1011.46H988.101V748.048"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_45"
				d="M1174.8 724.695H1221.79"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_46"
				d="M801.68 188.547H777.625V141.98H848.25"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_47"
				d="M871.466 141.841V119.327"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_48"
				d="M1384.58 351.321V281.821H1336.75"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_49"
				d="M1361.5 281.821V304.615"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_50"
				d="M1337.87 235.674V258.467H1314.51V235.674V188.547C1314.51 170.788 1309.34 141.98 1267.8 141.98C1226.27 141.98 1221.51 141.98 1221.51 141.98H1197.74V165.334"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_51"
				d="M1219.83 328.248V351.741"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_52"
				d="M1197.88 235.675V211.902H1221.23"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_53"
				d="M1501.07 374.675H1454.5V328.248H1407.93"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_54"
				d="M1524.43 374.674H1571V398.307"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_55"
				d="M1477.72 304.614H1407.79V165.193"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_56"
				d="M1501.07 281.821H1431.15V212.32H1454.5"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_57"
				d="M1454.5 258.468H1524.43V328.248H1477.72V351.741"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_58"
				d="M1501.07 328.248V304.615"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_59"
				d="M1501.07 351.461H1547.78V374.675"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_60"
				d="M1571 374.675V328.248V235.674V141.98H1454.5V235.114H1547.78V165.194H1477.72V211.901H1524.43V188.967H1501.07"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_61"
				d="M1571 328.248H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_62"
				d="M1524.43 305.174H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_63"
				d="M1571 281.821H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_64"
				d="M1524.43 258.468H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_65"
				d="M1407.93 188.547H1431.15V141.98"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_66"
				d="M1407.79 258.328H1361.5V234.975H1384.72V118.627H1407.93V141.841"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_67"
				d="M1454.5 608.488H1501.07V584.995"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_68"
				d="M1501.07 608.488H1547.78V654.775H1501.07V632.121H1524.43"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_69"
				d="M1571 584.854V701.481H1547.78V678.128H1501.07"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_70"
				d="M1477.72 608.488V748.049"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_71"
				d="M1454.5 678.269H1407.79"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_72"
				d="M1384.58 701.482H1407.93V771.402H1384.58V748.049H1338.15V771.402"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_73"
				d="M1151.31 748.048H1267.94V724.554H1384.58V654.494H1431.15V631.561H1454.5V701.76L1431.15 701.481V771.401"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_74"
				d="M1454.5 701.761V794.755"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_75"
				d="M1291.16 725.255V773.36"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_76"
				d="M1314.51 725.255V817.969"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_77"
				d="M1151.31 841.322H1221.79V771.542H1244.45V817.969"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_78"
				d="M1221.79 841.322H1267.94V771.542"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_79"
				d="M1267.94 841.322H1291.3V794.755"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_80"
				d="M1291.3 841.322H1338.15V794.755H1431.15V817.968"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_81"
				d="M1360.66 794.755V771.542"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_82"
				d="M1338.15 841.322H1454.5H1477.72M1454.5 771.542H1477.72V817.175"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_83"
				d="M1361.5 841.323V817.969"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_84"
				d="M1384.72 794.755V817.968"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_85"
				d="M1407.79 841.323V817.969"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_86"
				d="M1477.72 701.482H1524.43V725.255H1501.07V747.769H1547.78V817.969H1501.07V771.402"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_87"
				d="M1524.43 725.255H1571V701.482"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_88"
				d="M1571 725.255V841.322H1547.78"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_89"
				d="M1524.43 749.307V794.755"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_90"
				d="M1011.32 724.695H941.531V701.482"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_91"
				d="M964.047 748.048V817.968H894.961V841.321"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_92"
				d="M545.193 2.42041H1571V141.981"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_93"
				d="M988.101 841.322H615.119H545.193V25.353"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_94"
				d="M941.531 747.77V794.756H872.584V841.323"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_95"
				d="M778.325 817.968H848.25V771.541H918.176V747.768V724.695H778.325"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_96"
				d="M918.176 747.77H823.497"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_97"
				d="M754.97 654.775H731.754V584.854H638.474"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_98"
				d="M754.97 724.695H731.615V678.128H708.399V654.774V608.208H731.755"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_99"
				d="M777.626 771.402H731.615V817.968H754.97V794.755H824.895V771.402H801.96V724.695"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_100"
				d="M731.615 817.969H615.119"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_101"
				d="M591.764 841.323V748.049H615.119V794.756H708.399V747.77"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_102"
				d="M568.549 817.968V724.695"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_103"
				d="M638.474 724.695V771.402"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_104"
				d="M661.689 794.475V748.048"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_105"
				d="M684.904 724.695V771.402"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_106"
				d="M591.764 724.696H708.399V701.482H684.905V608.488H568.549V701.482H661.689V632.121H591.764V678.129H638.474V654.775H615.119"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_107"
				d="M545.193 654.775H568.548"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_108"
				d="M591.764 607.509V561.501"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_109"
				d="M591.764 584.996H568.549V537.03"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_110"
				d="M545.193 513.815H615.119"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_111"
				d="M591.764 538.289H638.474V561.502"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_112"
				d="M615.119 607.509V561.501"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_113"
				d="M615.119 491.721H568.548V375.094H661.689V281.541H545.193"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_114"
				d="M568.549 351.741H638.474V328.388H568.549V305.174H638.474V281.821"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_115"
				d="M568.549 467.388H615.119V445.014H591.764V397.888H661.689"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_116"
				d="M615.119 397.888V421.521H638.474V444.315"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_117"
				d="M591.764 258.468H545.193"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_118"
				d="M568.549 258.328V188.967H591.764V235.674H638.474H731.755V118.627H661.689V212.32H708.399V141.981H685.044V188.967"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_119"
				d="M545.193 165.193H615.119V212.32H638.474"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_120"
				d="M754.97 118.627H894.821V165.194"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_121"
				d="M871.605 211.902H894.961"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_122"
				d="M894.821 141.84H941.531"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_123"
				d="M964.746 142.121V118.627H916.777"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_124"
				d="M1081.38 165.194V141.841H1011.32L987.821 141.701H988.101V95.2739H871.046"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_125"
				d="M1058.17 95.2729H1011.32V118.626H1080.96V48.7061"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_126"
				d="M1127.95 141.98H1104.74V48.7061"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_127"
				d="M1151.31 142.121V118.628H1128.09V71.9209"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_128"
				d="M1174.8 141.841V95.2739H1151.31"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_129"
				d="M1197.88 141.98V48.7061"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_130"
				d="M1151.31 71.9202H1174.8V25.3533H1244.17V2"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_131"
				d="M1221.65 141.981V71.9209"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_132"
				d="M1221.23 48.7061H1267.94H1336.75"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_133"
				d="M1244.59 48.7061V118.626"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_134"
				d="M1267.94 141.981V71.9209"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_135"
				d="M1291.3 48.7061V118.626"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_136"
				d="M1313.53 175.682V71.9209"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_137"
				d="M1314.51 118.627H1360.66V212.321H1338.15V141.841"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_138"
				d="M1267.94 25.3542H1337.59H1361.22V48.7076H1384.58V2.42041"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_139"
				d="M1337.59 71.9209H1431.15"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_140"
				d="M1338.15 95.2739H1501.07V141.841"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_141"
				d="M1524.43 118.628V71.9209"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_142"
				d="M1547.78 141.841V95.2739"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_143"
				d="M1571 71.9199H1501.07V48.7064V25.353H1547.78V48.7064H1524.43"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_144"
				d="M1501.07 25.353H1477.72V71.9199H1454.5V48.7064H1407.79"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_145"
				d="M1454.5 2.42041V25.4941H1407.79"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_146"
				d="M1151.31 48.7076V2.42041"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_147"
				d="M1128.09 48.7076V25.4941H1058.17V2.42041"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_148"
				d="M1011.46 71.9211H1058.17V48.7076H1034.81V2.42041"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_149"
				d="M1431.15 118.627H1477.72V141.841"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_150"
				d="M638.474 188.967V95.2739"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_151"
				d="M591.764 2.42041V48.7076H568.549V142.121H615.119V71.9211V48.7076V25.4941H684.905"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_152"
				d="M568.549 2.42041V25.4941"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_153"
				d="M591.764 48.7061V72.3391V95.2729"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_154"
				d="M591.764 141.841V118.627"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_155"
				d="M615.119 48.7061H708.399H801.96"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_156"
				d="M615.119 71.9209H661.689V95.2742H731.615"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_157"
				d="M685.044 48.7061V72.3391"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_158"
				d="M754.97 48.7067V71.9202H824.895V25.4932"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_159"
				d="M777.625 72.3398V95.2737H848.25V118.627"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_160"
				d="M708.399 48.7067V25.4932H778.325"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_161"
				d="M801.96 2.42041V25.3542"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_162"
				d="M824.895 48.7067H848.25V72.3397H919.015V25.3533H872.025V2"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_163"
				d="M964.187 48.8462H988.101V72.3394H941.531V25.353H1011.46V48.7064"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_164"
				d="M896.499 48.8462H872.025V25.353H848.25"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_165"
				d="M1150.75 584.155H1174.8"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_166"
				d="M1477.72 841.322H1524.43"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_167"
				d="M1127.95 349.923V374.675"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_168"
				d="M708.539 95.2737V72.3398"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_169"
				d="M685.044 281.821V398.448H708.4H754.97C754.97 398.448 753.292 421.801 777.626 421.801"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_170"
				d="M964.047 632.121V596.742C964.047 567.655 934.538 561.642 897.198 561.642H882.514V538.289V445.015C882.514 424.738 860.697 421.662 823.357 421.662V395.651"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_171"
				d="M1081.66 561.502H986.703V538.289"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_172"
				d="M778.325 607.508H853.425V677.149H824.895V701.481H801.96H754.97V654.495"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_173"
				d="M824.895 654.775V630.862H801.96V654.495V677.15H778.185V632.121H754.97V584.575H853.425"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_174"
				d="M1244.87 724.555H1267.94V701.761H1361.5V654.775"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_175"
				d="M1338.15 654.775V677.149H1291.3V654.775H1313.53"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_176"
				d="M1338.15 654.775V632.121H1407.93"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_177"
				d="M1431.15 608.488H1361.22V584.854H1313.67"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_178"
				d="M1034.67 303.635H1011.46"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_179"
				d="M941.531 351.741V397.889"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_180"
				d="M871.466 351.741V397.889"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
		</g>
		<g id="title">
			<path
				id="Vector_181"
				d="M868.948 239.449C867.27 243.364 864.892 246.72 861.816 249.517C858.739 252.314 855.103 254.551 850.628 256.09C846.292 257.628 841.398 258.467 836.223 258.467C830.909 258.467 826.014 257.628 821.679 256.09C817.343 254.551 813.707 252.314 810.77 249.517C807.833 246.72 805.456 243.364 803.918 239.449C802.239 235.533 801.54 231.198 801.54 226.304V165.193H824.895V209.663C824.895 211.9 825.455 223.367 825.734 225.465C826.573 229.66 828.252 235.673 836.503 235.673C845.034 235.673 846.712 229.939 847.411 225.465C847.691 223.507 848.25 211.9 848.25 209.663V165.193H871.465V226.304C871.465 231.198 870.626 235.533 868.948 239.449Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_182"
				d="M941.391 258.467L917.896 211.76L918.316 258.467H894.821V165.193H918.176L941.531 215.676V165.193H964.886V258.467H941.391Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_183"
				d="M988.101 258.467V165.193H1011.46V258.467H988.101Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_184"
				d="M1081.24 188.407V258.467H1057.89V188.407H1034.67V165.193H1104.6V188.407H1081.24Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_185"
				d="M1127.95 258.467V165.193H1197.88V188.687H1155.92V200.293H1174.52V223.647H1155.92V235.533H1197.88V258.327H1127.95V258.467Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_186"
				d="M1303.32 211.62C1303.32 219.731 1302.07 226.863 1299.69 232.736C1297.31 238.61 1294.09 243.504 1290.18 247.419C1286.26 251.195 1281.79 253.992 1276.89 255.81C1272 257.628 1265.43 258.467 1260.39 258.467H1221.23V165.193H1256.2C1261.37 165.193 1271.44 166.032 1276.61 167.431C1281.65 168.969 1286.26 171.486 1290.18 175.122C1294.09 178.618 1297.31 183.512 1299.83 189.386C1302.07 195.399 1303.32 202.81 1303.32 211.62ZM1279.83 212.18C1279.83 207.705 1279.13 203.929 1277.73 200.992C1276.33 198.056 1274.52 195.679 1272.28 193.861C1270.04 192.043 1267.38 190.784 1264.59 190.085C1261.65 189.386 1247.24 188.966 1244.17 188.966V235.673H1256.06C1259.27 235.673 1261.51 235.253 1264.45 234.554C1267.38 233.715 1270.04 232.457 1272.28 230.639C1274.52 228.821 1276.33 226.443 1277.73 223.367C1279.13 220.43 1279.83 216.655 1279.83 212.18Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_187"
				d="M987.262 490.182C987.262 497.174 986.143 503.467 983.766 509.201C981.388 514.934 978.172 519.828 974.116 524.024C970.06 528.079 965.026 531.295 959.432 533.533C953.698 535.77 947.544 536.889 940.971 536.889C934.258 536.889 928.245 535.77 922.511 533.533C916.917 531.295 912.022 528.079 907.827 524.024C903.771 519.968 900.415 514.934 898.177 509.201C895.799 503.467 894.681 497.034 894.681 490.182C894.681 483.19 895.799 476.758 898.177 471.164C900.554 465.431 903.771 460.676 907.827 456.621C911.882 452.705 916.777 449.629 922.511 447.391C928.105 445.294 934.258 444.175 940.971 444.175C947.544 444.175 953.838 445.294 959.432 447.391C965.166 449.489 970.06 452.565 974.116 456.621C978.172 460.536 981.388 465.431 983.766 471.164C986.143 476.758 987.262 483.19 987.262 490.182ZM964.187 490.322C964.187 487.106 963.627 484.029 962.508 481.232C961.39 478.436 959.711 475.919 957.753 473.961C955.796 472.003 953.278 470.325 950.481 469.206C947.684 468.087 944.468 467.388 940.971 467.388C937.475 467.388 934.398 467.948 931.601 469.206C928.804 470.325 926.287 472.003 924.329 473.961C922.231 475.919 920.693 478.436 919.574 481.232C918.455 484.029 917.896 487.106 917.896 490.322C917.896 493.678 918.455 496.895 919.574 499.691C920.693 502.628 922.371 505.005 924.329 507.103C926.287 509.201 928.804 510.739 931.601 511.997C934.398 513.116 937.615 513.815 940.971 513.815C944.468 513.815 947.544 513.256 950.341 511.997C953.138 510.879 955.656 509.201 957.614 507.103C959.711 505.005 961.25 502.628 962.368 499.691C963.627 496.895 964.187 493.818 964.187 490.322Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<g id="Group">
				<path
					id="Vector_188"
					d="M846.712 506.963C846.712 502.768 845.453 499.832 843.076 498.293C840.558 496.615 837.342 495.916 833.286 495.916H823.636V519.13H833.426C834.964 519.13 836.503 518.99 838.041 518.57C839.579 518.29 841.118 517.591 842.376 516.752C843.635 515.913 844.754 514.655 845.593 513.116C846.292 511.438 846.712 509.481 846.712 506.963Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					id="Vector_189"
					d="M871.046 509.9C871.046 514.934 870.067 519.269 867.969 522.625C866.011 526.121 863.354 528.778 859.998 530.876C856.641 532.974 852.865 534.512 848.67 535.351C844.474 536.33 840.698 536.749 836.223 536.749H801.82V444.035H831.188C834.824 444.035 840.838 444.455 844.614 445.154C848.39 445.853 851.746 447.112 854.823 448.93C857.9 450.747 860.417 453.125 862.235 456.201C864.193 459.278 865.172 463.193 865.172 467.808C865.172 472.982 863.913 477.317 860.977 480.533C859.019 482.771 857.061 484.869 852.026 487.805V488.085C854.683 488.504 857.061 489.343 859.438 490.462C861.816 491.581 863.774 493.119 865.452 494.937C867.13 496.755 868.528 498.853 869.507 501.37C870.486 504.167 871.046 506.963 871.046 509.9Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					id="Vector_190"
					d="M842.237 469.906C842.237 466.689 841.258 464.592 839.3 463.333C837.342 462.075 834.685 461.515 831.328 461.515H823.497V478.855H831.468C832.727 478.855 833.985 478.716 835.244 478.436C836.503 478.156 837.761 477.737 838.74 477.037C839.859 476.338 840.698 475.499 841.258 474.241C841.957 473.402 842.237 471.863 842.237 469.906Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
			</g>
			<g id="Group_2">
				<path
					id="Vector_191"
					d="M1054.67 536.889L1046.14 502.069H1034.67V536.889H1011.46V444.175H1046.84C1060.68 444.175 1066.14 447.951 1069.49 450.188C1072.85 452.426 1075.51 455.223 1077.61 458.859C1079.56 462.494 1080.68 466.829 1080.68 472.283C1080.68 478.576 1077.89 486.267 1068.52 494.937L1081.1 537.029H1054.67V536.889Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					id="Vector_192"
					d="M1057.75 471.724C1057.75 467.528 1056.49 464.592 1054.11 463.054C1051.59 461.375 1048.38 460.676 1044.32 460.676H1034.67V483.89H1044.46C1046 483.89 1047.54 483.75 1049.08 483.33C1050.61 483.051 1052.15 482.352 1053.41 481.512C1054.67 480.673 1055.79 479.415 1056.63 477.877C1057.33 476.199 1057.75 474.241 1057.75 471.724Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
			</g>
			<path
				id="Vector_193"
				d="M1198.72 537.029V444.595H1221.93V537.029H1198.72Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_194"
				d="M1150.89 468.508V537.449H1127.67V468.508H1104.6V444.735H1174.1V468.508H1150.89Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_195"
				d="M1336.75 490.602C1336.75 497.594 1335.63 503.887 1333.25 509.621C1330.88 515.354 1327.66 520.248 1323.6 524.444C1319.55 528.499 1314.51 531.715 1308.92 533.953C1303.19 536.19 1297.03 537.309 1290.46 537.309C1283.75 537.309 1277.73 536.19 1272 533.953C1266.4 531.715 1261.51 528.499 1257.31 524.444C1253.26 520.388 1249.9 515.354 1247.66 509.621C1245.29 503.887 1244.17 497.454 1244.17 490.602C1244.17 483.61 1245.29 477.178 1247.66 471.584C1250.04 465.85 1253.26 461.096 1257.31 457.041C1261.37 453.125 1266.26 450.048 1272 447.811C1277.59 445.713 1283.75 444.595 1290.46 444.595C1297.03 444.595 1303.32 445.713 1308.92 447.811C1314.65 449.909 1319.55 452.985 1323.6 457.041C1327.66 460.956 1330.88 465.85 1333.25 471.584C1335.49 477.178 1336.75 483.47 1336.75 490.602ZM1313.53 490.742C1313.53 487.526 1312.97 484.449 1311.86 481.652C1310.74 478.856 1309.06 476.338 1307.1 474.381C1305.14 472.423 1302.63 470.745 1299.83 469.626C1297.03 468.507 1293.82 467.808 1290.32 467.808C1286.82 467.808 1283.75 468.368 1280.95 469.626C1278.15 470.745 1275.63 472.423 1273.68 474.381C1271.58 476.338 1270.04 478.856 1268.92 481.652C1267.8 484.449 1267.24 487.526 1267.24 490.742C1267.24 494.098 1267.8 497.315 1268.92 500.111C1270.04 503.048 1271.72 505.425 1273.68 507.523C1275.63 509.621 1278.15 511.159 1280.95 512.417C1283.75 513.536 1286.96 514.235 1290.32 514.235C1293.82 514.235 1296.89 513.676 1299.69 512.417C1302.49 511.299 1305 509.621 1306.96 507.523C1309.06 505.425 1310.6 503.048 1311.72 500.111C1312.97 497.175 1313.53 494.098 1313.53 490.742Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_196"
				d="M1431.15 536.749H1408.35L1384.58 490.322L1385 536.749H1361.5V444.315H1384.16L1407.37 491.161H1407.65L1407.23 444.455H1431.01V513.816V536.749H1431.15Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_197"
				d="M754.83 537.588L745.879 514.235H716.231L708.259 537.588H684.904L719.867 444.315H743.222L778.185 537.588H754.83ZM731.754 467.528L720.007 502.489H743.362L731.754 467.528Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_198"
				d="M1229.62 609.467C1227.67 607.089 1225.29 605.271 1222.21 603.873C1219.13 602.475 1216.2 601.775 1213.4 601.775C1212 601.775 1210.46 601.915 1208.93 602.195C1207.39 602.475 1206.13 602.894 1204.87 603.593C1203.61 604.293 1202.63 605.271 1201.79 606.39C1200.95 607.509 1200.53 608.907 1200.53 610.725C1200.53 612.263 1200.81 613.522 1201.51 614.501C1202.21 615.48 1203.05 616.319 1204.31 617.158C1205.57 617.857 1207.11 618.556 1208.79 619.256C1210.46 619.815 1212.42 620.514 1214.66 621.213C1217.74 622.192 1220.95 623.311 1224.31 624.569C1227.67 625.828 1230.74 627.366 1233.54 629.464C1236.34 631.422 1238.57 633.939 1240.39 636.875C1242.21 639.812 1243.05 643.588 1243.05 647.923C1243.05 652.957 1242.07 657.432 1240.11 661.208C1238.15 664.983 1235.5 668.06 1232.28 670.437C1229.06 672.814 1225.29 674.632 1221.09 675.891C1216.9 677.01 1212.56 677.709 1208.09 677.709C1201.51 677.709 1195.22 676.59 1189.07 674.353C1182.91 672.115 1177.88 669.039 1173.82 664.843L1188.37 650.58C1190.61 653.237 1193.54 655.474 1197.18 657.292C1200.81 659.11 1204.45 659.949 1208.09 659.949C1209.76 659.949 1211.3 659.809 1212.84 659.39C1214.38 659.11 1215.78 658.551 1216.9 657.712C1218.02 657.012 1219 655.894 1219.69 654.635C1220.39 653.377 1220.67 651.838 1220.67 650.16C1220.67 648.482 1220.25 647.084 1219.41 645.965C1218.58 644.846 1217.32 643.728 1215.78 642.749C1214.24 641.77 1212.14 640.931 1209.76 640.092C1207.39 639.253 1204.73 638.414 1201.65 637.575C1198.72 636.596 1195.92 635.617 1193.12 634.358C1190.33 633.1 1187.81 631.561 1185.57 629.464C1183.33 627.506 1181.65 625.129 1180.26 622.332C1178.86 619.535 1178.3 616.179 1178.3 612.124C1178.3 607.229 1179.28 603.034 1181.38 599.398C1183.47 595.902 1186.13 592.966 1189.49 590.728C1192.84 588.491 1196.62 586.813 1200.81 585.834C1205.01 584.855 1209.35 584.295 1213.68 584.295C1218.86 584.295 1224.17 585.274 1229.48 587.092C1234.94 588.91 1239.55 591.707 1243.61 595.203L1229.62 609.467Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_199"
				d="M1035.37 677.429L1026.42 654.075H996.772L988.8 677.429H965.445L1000.41 584.155H1023.76L1058.73 677.429H1035.37ZM1012.16 607.509L1000.41 642.469H1023.76L1012.16 607.509Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<g id="Group_3">
				<path
					id="Vector_200"
					d="M923.07 647.364C923.07 643.169 921.812 640.232 919.434 638.694C916.917 637.016 913.7 636.316 909.645 636.316H899.995V659.53H909.784C911.323 659.53 912.861 659.39 914.4 658.971C915.938 658.691 917.476 657.992 918.735 657.153C919.994 656.314 921.112 655.055 921.951 653.517C922.651 651.979 923.07 649.881 923.07 647.364Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					id="Vector_201"
					d="M947.404 650.44C947.404 655.474 946.425 659.809 944.328 663.165C942.37 666.661 939.713 669.318 936.356 671.416C933 673.514 929.224 675.052 925.028 675.891C920.833 676.87 917.057 677.289 912.582 677.289H878.178V584.575H907.547C911.183 584.575 917.197 584.995 920.973 585.694C924.749 586.393 928.105 587.652 931.182 589.47C934.258 591.288 936.776 593.665 938.594 596.741C940.552 599.818 941.531 603.733 941.531 608.348C941.531 613.522 940.272 617.857 937.335 621.074C935.377 623.311 933.419 625.409 928.385 628.345V628.625C931.042 629.044 933.419 629.883 935.797 631.002C938.174 632.121 940.132 633.659 941.81 635.477C943.489 637.295 944.887 639.393 945.866 641.91C946.985 644.567 947.404 647.364 947.404 650.44Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
				<path
					id="Vector_202"
					d="M918.595 610.446C918.595 607.23 917.616 605.132 915.658 603.874C913.7 602.615 911.043 602.056 907.687 602.056H899.855V619.396H907.827C909.085 619.396 910.344 619.256 911.603 618.976C912.861 618.697 914.12 618.277 915.099 617.578C916.218 616.879 917.057 616.04 917.616 614.781C918.316 613.802 918.595 612.264 918.595 610.446Z"
					stroke="#B0A380"
					stroke-width="3"
					stroke-miterlimit="10"
				/>
			</g>
			<path
				id="Vector_203"
				d="M1128.37 677.429L1104.88 630.722L1105.3 677.429H1081.8V584.155H1105.16L1128.51 634.638V584.155H1151.87V677.429H1128.37Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_204"
				d="M1023.06 396.77L1014.11 373.416H984.465L976.494 396.77H953.138L988.101 303.496H1011.46L1046.42 396.77H1023.06ZM999.849 326.849L988.101 361.81H1011.46L999.849 326.849Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_205"
				d="M1293.82 329.926C1291.86 327.548 1289.48 325.73 1286.4 324.332C1283.33 322.934 1280.39 322.234 1277.59 322.234C1276.19 322.234 1274.66 322.374 1273.12 322.654C1271.58 322.934 1270.32 323.353 1269.06 324.052C1267.8 324.752 1266.82 325.73 1265.98 326.849C1265.15 327.968 1264.73 329.366 1264.73 331.184C1264.73 332.722 1265.01 333.981 1265.71 334.96C1266.4 335.939 1267.24 336.778 1268.5 337.617C1269.76 338.316 1271.3 339.015 1272.98 339.714C1274.66 340.274 1276.61 340.973 1278.85 341.672C1281.93 342.651 1285.14 343.77 1288.5 345.028C1291.86 346.287 1294.93 347.825 1297.73 349.923C1300.53 351.881 1302.77 354.398 1304.58 357.334C1306.4 360.271 1307.24 364.047 1307.24 368.382C1307.24 373.416 1306.26 377.891 1304.3 381.667C1302.35 385.442 1299.69 388.519 1296.47 390.896C1293.26 393.273 1289.48 395.091 1285.28 396.35C1281.09 397.469 1276.75 398.168 1272.28 398.168C1265.71 398.168 1259.41 397.049 1253.26 394.812C1247.1 392.574 1242.07 389.498 1238.01 385.302L1252.56 371.039C1254.8 373.696 1257.73 375.933 1261.37 377.751C1265.01 379.569 1268.64 380.408 1272.28 380.408C1273.96 380.408 1275.49 380.268 1277.03 379.849C1278.57 379.569 1279.97 379.01 1281.09 378.171C1282.21 377.471 1283.19 376.353 1283.89 375.094C1284.59 373.836 1284.86 372.297 1284.86 370.619C1284.86 368.941 1284.45 367.543 1283.61 366.424C1282.77 365.305 1281.51 364.187 1279.97 363.208C1278.43 362.229 1276.33 361.39 1273.96 360.551C1271.58 359.712 1268.92 358.873 1265.84 358.034C1262.91 357.055 1260.11 356.076 1257.31 354.817C1254.52 353.559 1252 352.02 1249.76 349.923C1247.52 347.965 1245.85 345.588 1244.45 342.791C1243.05 339.994 1242.49 336.638 1242.49 332.583C1242.49 327.688 1243.47 323.493 1245.57 319.857C1247.66 316.361 1250.32 313.425 1253.68 311.187C1257.03 308.95 1260.81 307.272 1265.01 306.293C1269.2 305.314 1273.54 304.754 1277.87 304.754C1283.05 304.754 1288.36 305.733 1293.68 307.551C1299.13 309.369 1303.74 312.166 1307.8 315.662L1293.82 329.926Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_206"
				d="M1149.91 373.555V303.635H1219.83V326.988H1173.26V338.595H1196.62V361.948H1173.26V373.555H1219.83V396.908H1149.91V373.555Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_207"
				d="M1104.74 327.408V396.349H1081.52V327.408H1058.45V303.635H1127.95V327.408H1104.74Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_208"
				d="M833.845 328.947C831.888 326.569 829.51 324.751 826.433 323.353C823.357 321.955 820.42 321.255 817.623 321.255C816.224 321.255 814.686 321.395 813.148 321.675C811.609 321.955 810.35 322.374 809.092 323.073C807.833 323.773 806.854 324.751 806.015 325.87C805.176 326.989 804.756 328.387 804.756 330.205C804.756 331.743 805.036 333.002 805.735 333.981C806.435 334.96 807.274 335.799 808.532 336.638C809.791 337.337 811.329 338.036 813.008 338.735C814.686 339.295 816.644 339.994 818.881 340.693C821.958 341.672 825.175 342.791 828.531 344.049C831.888 345.308 834.964 346.846 837.761 348.944C840.558 350.902 842.796 353.419 844.614 356.355C846.432 359.292 847.271 363.068 847.271 367.403C847.271 372.437 846.292 376.912 844.334 380.688C842.376 384.463 839.719 387.54 836.503 389.917C833.286 392.294 829.51 394.112 825.315 395.371C821.119 396.49 816.784 397.189 812.308 397.189C805.735 397.189 799.442 396.07 793.289 393.833C787.135 391.595 782.101 388.519 778.045 384.323L792.589 370.06C794.827 372.717 797.764 374.954 801.4 376.772C805.036 378.59 808.672 379.429 812.308 379.429C813.987 379.429 815.525 379.289 817.063 378.87C818.602 378.59 820 378.031 821.119 377.192C822.238 376.492 823.217 375.374 823.916 374.115C824.615 372.857 824.895 371.318 824.895 369.64C824.895 367.962 824.475 366.564 823.636 365.445C822.797 364.326 821.539 363.208 820 362.229C818.462 361.25 816.364 360.411 813.987 359.572C811.609 358.733 808.952 357.894 805.875 357.055C802.938 356.076 800.141 355.097 797.344 353.838C794.547 352.58 792.03 351.041 789.792 348.944C787.555 346.986 785.877 344.609 784.478 341.812C783.08 339.015 782.52 335.659 782.52 331.604C782.52 326.709 783.499 322.514 785.597 318.878C787.695 315.382 790.352 312.446 793.708 310.208C797.065 307.971 800.841 306.293 805.036 305.314C809.232 304.335 813.567 303.775 817.902 303.775C823.077 303.775 828.391 304.754 833.706 306.572C839.16 308.39 843.775 311.187 847.831 314.683L833.845 328.947Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
			<path
				id="Vector_209"
				d="M917.756 327.408V396.349H894.541V327.408H871.466V303.635H940.971V327.408H917.756Z"
				stroke="#B0A380"
				stroke-width="3"
				stroke-miterlimit="10"
			/>
		</g>
		{#if step === 5}
			<g id="title-bold">
				<path
					in:draw={drawParams}
					id="Vector_210"
					d="M868.948 239.449C867.27 243.364 864.892 246.72 861.816 249.517C858.739 252.314 855.103 254.551 850.628 256.09C846.292 257.628 841.398 258.467 836.223 258.467C830.909 258.467 826.014 257.628 821.679 256.09C817.343 254.551 813.707 252.314 810.77 249.517C807.833 246.72 805.456 243.364 803.918 239.449C802.239 235.533 801.54 231.198 801.54 226.304V165.193H824.895V209.663C824.895 211.9 825.455 223.367 825.734 225.465C826.573 229.66 828.252 235.673 836.503 235.673C845.034 235.673 846.712 229.939 847.411 225.465C847.691 223.507 848.25 211.9 848.25 209.663V165.193H871.465V226.304C871.465 231.198 870.626 235.533 868.948 239.449Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_211"
					d="M941.391 258.467L917.896 211.76L918.316 258.467H894.821V165.193H918.176L941.531 215.676V165.193H964.886V258.467H941.391Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_212"
					d="M988.101 258.467V165.193H1011.46V258.467H988.101Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_213"
					d="M1081.24 188.407V258.467H1057.89V188.407H1034.67V165.193H1104.6V188.407H1081.24Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_214"
					d="M1127.95 258.467V165.193H1197.88V188.687H1155.92V200.293H1174.52V223.647H1155.92V235.533H1197.88V258.327H1127.95V258.467Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_215"
					d="M1303.32 211.62C1303.32 219.731 1302.07 226.863 1299.69 232.736C1297.31 238.61 1294.09 243.504 1290.18 247.419C1286.26 251.195 1281.79 253.992 1276.89 255.81C1272 257.628 1265.43 258.467 1260.39 258.467H1221.23V165.193H1256.2C1261.37 165.193 1271.44 166.032 1276.61 167.431C1281.65 168.969 1286.26 171.486 1290.18 175.122C1294.09 178.618 1297.31 183.512 1299.83 189.386C1302.07 195.399 1303.32 202.81 1303.32 211.62ZM1279.83 212.18C1279.83 207.705 1279.13 203.929 1277.73 200.992C1276.33 198.056 1274.52 195.679 1272.28 193.861C1270.04 192.043 1267.38 190.784 1264.59 190.085C1261.65 189.386 1247.24 188.966 1244.17 188.966V235.673H1256.06C1259.27 235.673 1261.51 235.253 1264.45 234.554C1267.38 233.715 1270.04 232.457 1272.28 230.639C1274.52 228.821 1276.33 226.443 1277.73 223.367C1279.13 220.43 1279.83 216.655 1279.83 212.18Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_216"
					d="M987.262 490.182C987.262 497.174 986.143 503.467 983.766 509.201C981.388 514.934 978.172 519.828 974.116 524.024C970.06 528.079 965.026 531.295 959.432 533.533C953.698 535.77 947.544 536.889 940.971 536.889C934.258 536.889 928.245 535.77 922.511 533.533C916.917 531.295 912.022 528.079 907.827 524.024C903.771 519.968 900.415 514.934 898.177 509.201C895.799 503.467 894.681 497.034 894.681 490.182C894.681 483.19 895.799 476.758 898.177 471.164C900.554 465.431 903.771 460.676 907.827 456.621C911.882 452.705 916.777 449.629 922.511 447.391C928.105 445.294 934.258 444.175 940.971 444.175C947.544 444.175 953.838 445.294 959.432 447.391C965.166 449.489 970.06 452.565 974.116 456.621C978.172 460.536 981.388 465.431 983.766 471.164C986.143 476.758 987.262 483.19 987.262 490.182ZM964.187 490.322C964.187 487.106 963.627 484.029 962.508 481.232C961.39 478.436 959.711 475.919 957.753 473.961C955.796 472.003 953.278 470.325 950.481 469.206C947.684 468.087 944.468 467.388 940.971 467.388C937.475 467.388 934.398 467.948 931.601 469.206C928.804 470.325 926.287 472.003 924.329 473.961C922.231 475.919 920.693 478.436 919.574 481.232C918.455 484.029 917.896 487.106 917.896 490.322C917.896 493.678 918.455 496.895 919.574 499.691C920.693 502.628 922.371 505.005 924.329 507.103C926.287 509.201 928.804 510.739 931.601 511.997C934.398 513.116 937.615 513.815 940.971 513.815C944.468 513.815 947.544 513.256 950.341 511.997C953.138 510.879 955.656 509.201 957.614 507.103C959.711 505.005 961.25 502.628 962.368 499.691C963.627 496.895 964.187 493.818 964.187 490.322Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<g id="Group_4">
					<path
						in:draw={drawParams}
						id="Vector_217"
						d="M846.712 506.963C846.712 502.768 845.453 499.832 843.076 498.293C840.558 496.615 837.342 495.916 833.286 495.916H823.636V519.13H833.426C834.964 519.13 836.503 518.99 838.041 518.57C839.579 518.29 841.118 517.591 842.376 516.752C843.635 515.913 844.754 514.655 845.593 513.116C846.292 511.438 846.712 509.481 846.712 506.963Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_218"
						d="M871.046 509.9C871.046 514.934 870.067 519.269 867.969 522.625C866.011 526.121 863.354 528.778 859.998 530.876C856.641 532.974 852.865 534.512 848.67 535.351C844.474 536.33 840.698 536.749 836.223 536.749H801.82V444.035H831.188C834.824 444.035 840.838 444.455 844.614 445.154C848.39 445.853 851.746 447.112 854.823 448.93C857.9 450.747 860.417 453.125 862.235 456.201C864.193 459.278 865.172 463.193 865.172 467.808C865.172 472.982 863.913 477.317 860.977 480.533C859.019 482.771 857.061 484.869 852.026 487.805V488.085C854.683 488.504 857.061 489.343 859.438 490.462C861.816 491.581 863.774 493.119 865.452 494.937C867.13 496.755 868.528 498.853 869.507 501.37C870.486 504.167 871.046 506.963 871.046 509.9Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_219"
						d="M842.237 469.906C842.237 466.689 841.258 464.592 839.3 463.333C837.342 462.075 834.685 461.515 831.328 461.515H823.497V478.855H831.468C832.727 478.855 833.985 478.716 835.244 478.436C836.503 478.156 837.761 477.737 838.74 477.037C839.859 476.338 840.698 475.499 841.258 474.241C841.957 473.402 842.237 471.863 842.237 469.906Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
				</g>
				<g id="Group_5">
					<path
						in:draw={drawParams}
						id="Vector_220"
						d="M1054.67 536.889L1046.14 502.069H1034.67V536.889H1011.46V444.175H1046.84C1060.68 444.175 1066.14 447.951 1069.49 450.188C1072.85 452.426 1075.51 455.223 1077.61 458.859C1079.56 462.494 1080.68 466.829 1080.68 472.283C1080.68 478.576 1077.89 486.267 1068.52 494.937L1081.1 537.029H1054.67V536.889Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_221"
						d="M1057.75 471.724C1057.75 467.528 1056.49 464.592 1054.11 463.054C1051.59 461.375 1048.38 460.676 1044.32 460.676H1034.67V483.89H1044.46C1046 483.89 1047.54 483.75 1049.08 483.33C1050.61 483.051 1052.15 482.352 1053.41 481.512C1054.67 480.673 1055.79 479.415 1056.63 477.877C1057.33 476.199 1057.75 474.241 1057.75 471.724Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
				</g>
				<path
					in:draw={drawParams}
					id="Vector_222"
					d="M1198.72 537.029V444.595H1221.93V537.029H1198.72Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_223"
					d="M1150.89 468.508V537.449H1127.67V468.508H1104.6V444.735H1174.1V468.508H1150.89Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_224"
					d="M1336.75 490.602C1336.75 497.594 1335.63 503.887 1333.25 509.621C1330.88 515.354 1327.66 520.248 1323.6 524.444C1319.55 528.499 1314.51 531.715 1308.92 533.953C1303.19 536.19 1297.03 537.309 1290.46 537.309C1283.75 537.309 1277.73 536.19 1272 533.953C1266.4 531.715 1261.51 528.499 1257.31 524.444C1253.26 520.388 1249.9 515.354 1247.66 509.621C1245.29 503.887 1244.17 497.454 1244.17 490.602C1244.17 483.61 1245.29 477.178 1247.66 471.584C1250.04 465.85 1253.26 461.096 1257.31 457.041C1261.37 453.125 1266.26 450.048 1272 447.811C1277.59 445.713 1283.75 444.595 1290.46 444.595C1297.03 444.595 1303.32 445.713 1308.92 447.811C1314.65 449.909 1319.55 452.985 1323.6 457.041C1327.66 460.956 1330.88 465.85 1333.25 471.584C1335.49 477.178 1336.75 483.47 1336.75 490.602ZM1313.53 490.742C1313.53 487.526 1312.97 484.449 1311.86 481.652C1310.74 478.856 1309.06 476.338 1307.1 474.381C1305.14 472.423 1302.63 470.745 1299.83 469.626C1297.03 468.507 1293.82 467.808 1290.32 467.808C1286.82 467.808 1283.75 468.368 1280.95 469.626C1278.15 470.745 1275.63 472.423 1273.68 474.381C1271.58 476.338 1270.04 478.856 1268.92 481.652C1267.8 484.449 1267.24 487.526 1267.24 490.742C1267.24 494.098 1267.8 497.315 1268.92 500.111C1270.04 503.048 1271.72 505.425 1273.68 507.523C1275.63 509.621 1278.15 511.159 1280.95 512.417C1283.75 513.536 1286.96 514.235 1290.32 514.235C1293.82 514.235 1296.89 513.676 1299.69 512.417C1302.49 511.299 1305 509.621 1306.96 507.523C1309.06 505.425 1310.6 503.048 1311.72 500.111C1312.97 497.175 1313.53 494.098 1313.53 490.742Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_225"
					d="M1431.15 536.749H1408.35L1384.58 490.322L1385 536.749H1361.5V444.315H1384.16L1407.37 491.161H1407.65L1407.23 444.455H1431.01V513.816V536.749H1431.15Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_226"
					d="M754.83 537.588L745.879 514.235H716.231L708.259 537.588H684.904L719.867 444.315H743.222L778.185 537.588H754.83ZM731.754 467.528L720.007 502.489H743.362L731.754 467.528Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_227"
					d="M1229.62 609.467C1227.67 607.089 1225.29 605.271 1222.21 603.873C1219.13 602.475 1216.2 601.775 1213.4 601.775C1212 601.775 1210.46 601.915 1208.93 602.195C1207.39 602.475 1206.13 602.894 1204.87 603.593C1203.61 604.293 1202.63 605.271 1201.79 606.39C1200.95 607.509 1200.53 608.907 1200.53 610.725C1200.53 612.263 1200.81 613.522 1201.51 614.501C1202.21 615.48 1203.05 616.319 1204.31 617.158C1205.57 617.857 1207.11 618.556 1208.79 619.256C1210.46 619.815 1212.42 620.514 1214.66 621.213C1217.74 622.192 1220.95 623.311 1224.31 624.569C1227.67 625.828 1230.74 627.366 1233.54 629.464C1236.34 631.422 1238.57 633.939 1240.39 636.875C1242.21 639.812 1243.05 643.588 1243.05 647.923C1243.05 652.957 1242.07 657.432 1240.11 661.208C1238.15 664.983 1235.5 668.06 1232.28 670.437C1229.06 672.814 1225.29 674.632 1221.09 675.891C1216.9 677.01 1212.56 677.709 1208.09 677.709C1201.51 677.709 1195.22 676.59 1189.07 674.353C1182.91 672.115 1177.88 669.039 1173.82 664.843L1188.37 650.58C1190.61 653.237 1193.54 655.474 1197.18 657.292C1200.81 659.11 1204.45 659.949 1208.09 659.949C1209.76 659.949 1211.3 659.809 1212.84 659.39C1214.38 659.11 1215.78 658.551 1216.9 657.712C1218.02 657.012 1219 655.894 1219.69 654.635C1220.39 653.377 1220.67 651.838 1220.67 650.16C1220.67 648.482 1220.25 647.084 1219.41 645.965C1218.58 644.846 1217.32 643.728 1215.78 642.749C1214.24 641.77 1212.14 640.931 1209.76 640.092C1207.39 639.253 1204.73 638.414 1201.65 637.575C1198.72 636.596 1195.92 635.617 1193.12 634.358C1190.33 633.1 1187.81 631.561 1185.57 629.464C1183.33 627.506 1181.65 625.129 1180.26 622.332C1178.86 619.535 1178.3 616.179 1178.3 612.124C1178.3 607.229 1179.28 603.034 1181.38 599.398C1183.47 595.902 1186.13 592.966 1189.49 590.728C1192.84 588.491 1196.62 586.813 1200.81 585.834C1205.01 584.855 1209.35 584.295 1213.68 584.295C1218.86 584.295 1224.17 585.274 1229.48 587.092C1234.94 588.91 1239.55 591.707 1243.61 595.203L1229.62 609.467Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_228"
					d="M1035.37 677.429L1026.42 654.075H996.772L988.8 677.429H965.445L1000.41 584.155H1023.76L1058.73 677.429H1035.37ZM1012.16 607.509L1000.41 642.469H1023.76L1012.16 607.509Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<g id="Group_6">
					<path
						in:draw={drawParams}
						id="Vector_229"
						d="M923.07 647.364C923.07 643.169 921.812 640.232 919.434 638.694C916.917 637.016 913.7 636.316 909.645 636.316H899.995V659.53H909.784C911.323 659.53 912.861 659.39 914.4 658.971C915.938 658.691 917.476 657.992 918.735 657.153C919.994 656.314 921.112 655.055 921.951 653.517C922.651 651.979 923.07 649.881 923.07 647.364Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_230"
						d="M947.404 650.44C947.404 655.474 946.425 659.809 944.328 663.165C942.37 666.661 939.713 669.318 936.356 671.416C933 673.514 929.224 675.052 925.028 675.891C920.833 676.87 917.057 677.289 912.582 677.289H878.178V584.575H907.547C911.183 584.575 917.197 584.995 920.973 585.694C924.749 586.393 928.105 587.652 931.182 589.47C934.258 591.288 936.776 593.665 938.594 596.741C940.552 599.818 941.531 603.733 941.531 608.348C941.531 613.522 940.272 617.857 937.335 621.074C935.377 623.311 933.419 625.409 928.385 628.345V628.625C931.042 629.044 933.419 629.883 935.797 631.002C938.174 632.121 940.132 633.659 941.81 635.477C943.489 637.295 944.887 639.393 945.866 641.91C946.985 644.567 947.404 647.364 947.404 650.44Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
					<path
						in:draw={drawParams}
						id="Vector_231"
						d="M918.595 610.446C918.595 607.23 917.616 605.132 915.658 603.874C913.7 602.615 911.043 602.056 907.687 602.056H899.855V619.396H907.827C909.085 619.396 910.344 619.256 911.603 618.976C912.861 618.697 914.12 618.277 915.099 617.578C916.218 616.879 917.057 616.04 917.616 614.781C918.316 613.802 918.595 612.264 918.595 610.446Z"
						stroke="#6B50DC"
						stroke-width="5"
						stroke-miterlimit="10"
					/>
				</g>
				<path
					in:draw={drawParams}
					id="Vector_232"
					d="M1128.37 677.429L1104.88 630.722L1105.3 677.429H1081.8V584.155H1105.16L1128.51 634.638V584.155H1151.87V677.429H1128.37Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_233"
					d="M1023.06 396.77L1014.11 373.416H984.465L976.494 396.77H953.138L988.101 303.496H1011.46L1046.42 396.77H1023.06ZM999.849 326.849L988.101 361.81H1011.46L999.849 326.849Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_234"
					d="M1293.82 329.926C1291.86 327.548 1289.48 325.73 1286.4 324.332C1283.33 322.934 1280.39 322.234 1277.59 322.234C1276.19 322.234 1274.66 322.374 1273.12 322.654C1271.58 322.934 1270.32 323.353 1269.06 324.052C1267.8 324.752 1266.82 325.73 1265.98 326.849C1265.15 327.968 1264.73 329.366 1264.73 331.184C1264.73 332.722 1265.01 333.981 1265.71 334.96C1266.4 335.939 1267.24 336.778 1268.5 337.617C1269.76 338.316 1271.3 339.015 1272.98 339.714C1274.66 340.274 1276.61 340.973 1278.85 341.672C1281.93 342.651 1285.14 343.77 1288.5 345.028C1291.86 346.287 1294.93 347.825 1297.73 349.923C1300.53 351.881 1302.77 354.398 1304.58 357.334C1306.4 360.271 1307.24 364.047 1307.24 368.382C1307.24 373.416 1306.26 377.891 1304.3 381.667C1302.35 385.442 1299.69 388.519 1296.47 390.896C1293.26 393.273 1289.48 395.091 1285.28 396.35C1281.09 397.469 1276.75 398.168 1272.28 398.168C1265.71 398.168 1259.41 397.049 1253.26 394.812C1247.1 392.574 1242.07 389.498 1238.01 385.302L1252.56 371.039C1254.8 373.696 1257.73 375.933 1261.37 377.751C1265.01 379.569 1268.64 380.408 1272.28 380.408C1273.96 380.408 1275.49 380.268 1277.03 379.849C1278.57 379.569 1279.97 379.01 1281.09 378.171C1282.21 377.471 1283.19 376.353 1283.89 375.094C1284.59 373.836 1284.86 372.297 1284.86 370.619C1284.86 368.941 1284.45 367.543 1283.61 366.424C1282.77 365.305 1281.51 364.187 1279.97 363.208C1278.43 362.229 1276.33 361.39 1273.96 360.551C1271.58 359.712 1268.92 358.873 1265.84 358.034C1262.91 357.055 1260.11 356.076 1257.31 354.817C1254.52 353.559 1252 352.02 1249.76 349.923C1247.52 347.965 1245.85 345.588 1244.45 342.791C1243.05 339.994 1242.49 336.638 1242.49 332.583C1242.49 327.688 1243.47 323.493 1245.57 319.857C1247.66 316.361 1250.32 313.425 1253.68 311.187C1257.03 308.95 1260.81 307.272 1265.01 306.293C1269.2 305.314 1273.54 304.754 1277.87 304.754C1283.05 304.754 1288.36 305.733 1293.68 307.551C1299.13 309.369 1303.74 312.166 1307.8 315.662L1293.82 329.926Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_235"
					d="M1149.91 373.555V303.635H1219.83V326.988H1173.26V338.595H1196.62V361.948H1173.26V373.555H1219.83V396.908H1149.91V373.555Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_236"
					d="M1104.74 327.408V396.349H1081.52V327.408H1058.45V303.635H1127.95V327.408H1104.74Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_237"
					d="M833.845 328.947C831.888 326.569 829.51 324.751 826.433 323.353C823.357 321.955 820.42 321.255 817.623 321.255C816.224 321.255 814.686 321.395 813.148 321.675C811.609 321.955 810.35 322.374 809.092 323.073C807.833 323.773 806.854 324.751 806.015 325.87C805.176 326.989 804.756 328.387 804.756 330.205C804.756 331.743 805.036 333.002 805.735 333.981C806.435 334.96 807.274 335.799 808.532 336.638C809.791 337.337 811.329 338.036 813.008 338.735C814.686 339.295 816.644 339.994 818.881 340.693C821.958 341.672 825.175 342.791 828.531 344.049C831.888 345.308 834.964 346.846 837.761 348.944C840.558 350.902 842.796 353.419 844.614 356.355C846.432 359.292 847.271 363.068 847.271 367.403C847.271 372.437 846.292 376.912 844.334 380.688C842.376 384.463 839.719 387.54 836.503 389.917C833.286 392.294 829.51 394.112 825.315 395.371C821.119 396.49 816.784 397.189 812.308 397.189C805.735 397.189 799.442 396.07 793.289 393.833C787.135 391.595 782.101 388.519 778.045 384.323L792.589 370.06C794.827 372.717 797.764 374.954 801.4 376.772C805.036 378.59 808.672 379.429 812.308 379.429C813.987 379.429 815.525 379.289 817.063 378.87C818.602 378.59 820 378.031 821.119 377.192C822.238 376.492 823.217 375.374 823.916 374.115C824.615 372.857 824.895 371.318 824.895 369.64C824.895 367.962 824.475 366.564 823.636 365.445C822.797 364.326 821.539 363.208 820 362.229C818.462 361.25 816.364 360.411 813.987 359.572C811.609 358.733 808.952 357.894 805.875 357.055C802.938 356.076 800.141 355.097 797.344 353.838C794.547 352.58 792.03 351.041 789.792 348.944C787.555 346.986 785.877 344.609 784.478 341.812C783.08 339.015 782.52 335.659 782.52 331.604C782.52 326.709 783.499 322.514 785.597 318.878C787.695 315.382 790.352 312.446 793.708 310.208C797.065 307.971 800.841 306.293 805.036 305.314C809.232 304.335 813.567 303.775 817.902 303.775C823.077 303.775 828.391 304.754 833.706 306.572C839.16 308.39 843.775 311.187 847.831 314.683L833.845 328.947Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
				<path
					in:draw={drawParams}
					id="Vector_238"
					d="M917.756 327.408V396.349H894.541V327.408H871.466V303.635H940.971V327.408H917.756Z"
					stroke="#6B50DC"
					stroke-width="5"
					stroke-miterlimit="10"
				/>
			</g>
		{/if}
		<g id="of" class:visible={step === 5}>
			<path
				id="Vector_239"
				d="M1361.17 428.414C1384.3 428.414 1403.06 409.656 1403.06 386.517C1403.06 363.378 1384.3 344.62 1361.17 344.62C1338.03 344.62 1319.27 363.378 1319.27 386.517C1319.27 409.656 1338.03 428.414 1361.17 428.414Z"
				fill="#1C1246"
			/>
			<g id="Group_7">
				<path
					id="Vector_240"
					d="M1340.63 386.378C1340.63 384.713 1340.91 383.187 1341.47 381.939C1342.02 380.551 1342.85 379.441 1343.82 378.609C1344.8 377.638 1346.04 376.944 1347.43 376.528C1348.82 375.973 1350.34 375.834 1352.01 375.834C1353.67 375.834 1355.2 376.112 1356.59 376.528C1357.97 377.083 1359.22 377.777 1360.19 378.609C1361.17 379.58 1362 380.69 1362.55 381.939C1363.11 383.326 1363.39 384.713 1363.39 386.378C1363.39 388.043 1363.11 389.569 1362.55 390.817C1362 392.205 1361.17 393.315 1360.19 394.286C1359.22 395.257 1357.97 395.951 1356.59 396.505C1355.2 397.06 1353.67 397.338 1352.01 397.338C1350.34 397.338 1348.82 397.06 1347.43 396.505C1346.04 395.951 1344.8 395.257 1343.82 394.286C1342.85 393.315 1342.02 392.205 1341.47 390.817C1340.91 389.569 1340.63 388.043 1340.63 386.378ZM1347.99 386.378C1347.99 387.072 1348.13 387.627 1348.26 388.182C1348.4 388.737 1348.68 389.291 1349.1 389.569C1349.51 389.846 1349.93 390.263 1350.34 390.54C1350.9 390.818 1351.45 390.817 1352.01 390.817C1352.56 390.817 1353.12 390.679 1353.67 390.54C1354.23 390.263 1354.65 389.985 1354.92 389.569C1355.34 389.153 1355.62 388.737 1355.76 388.182C1355.89 387.627 1356.03 387.072 1356.03 386.378C1356.03 385.684 1355.89 385.129 1355.76 384.575C1355.62 384.02 1355.2 383.603 1354.92 383.187C1354.51 382.771 1354.09 382.494 1353.67 382.355C1353.12 382.077 1352.7 382.077 1352.01 382.077C1351.32 382.077 1350.9 382.216 1350.34 382.355C1349.79 382.632 1349.37 382.91 1349.1 383.187C1348.82 383.465 1348.4 384.02 1348.26 384.575C1347.99 385.129 1347.99 385.684 1347.99 386.378Z"
					fill="#FFFDF8"
				/>
				<path
					id="Vector_241"
					d="M1374.48 384.158H1380.73V389.846H1374.62V396.783H1367.82V376.25H1381.7V382.077H1374.62V384.158H1374.48Z"
					fill="#FFFDF8"
				/>
			</g>
		</g>
		<g id="the" class:visible={step === 5}>
			<path
				id="Vector_242"
				d="M767.038 171.591C796.306 171.591 820.033 147.864 820.033 118.596C820.033 89.327 796.306 65.6001 767.038 65.6001C737.77 65.6001 714.043 89.327 714.043 118.596C714.043 147.864 737.77 171.591 767.038 171.591Z"
				fill="#1C1246"
			/>
			<g id="Group_8">
				<path
					id="Vector_243"
					d="M748.032 129.417H740.68V113.879H735.408V107.774H753.443V113.879H748.171V129.417H748.032Z"
					fill="#FFFDF8"
				/>
				<path
					id="Vector_244"
					d="M770.368 121.231H764.402V129.417H757.05V107.774H764.264V115.127H770.229V107.774H777.582V129.555H770.229V121.231H770.368Z"
					fill="#FFFDF8"
				/>
				<path
					id="Vector_245"
					d="M783.27 107.774H798.252V113.879H790.206V115.682H797.836V121.37H790.206V123.451H798.807V129.555H783.27V107.774Z"
					fill="#FFFDF8"
				/>
			</g>
		</g>
	</svg>
</div>

<style>
	.maze {
		width: 100%;
		height: 100%;
	}
	#path {
		transition: stroke-dashoffset var(--1s) ease;
	}
	#of,
	#the {
		opacity: 0;
		transition: opacity var(--1s);
	}
	#of.visible,
	#the.visible {
		opacity: 1;
	}
</style>
