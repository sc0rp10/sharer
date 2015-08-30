#Sharer

Requires jQuery.

Usage:
```
<!DOCTYPE html>
<html>
<head>
	<title>Sharer.js</title>
</head>
<body>
	<span data-share="vk">Vk</span>
	<span data-share="fb">Facebok</span>
	<span data-share="twitter">Twitter</span>

	<script src="/path/to/jquery.js"></script>
	<script src="sharer.js"></script>

	<script>
		var sharer = new Sharer();
		$(sharer.run); // method `run` will be bound to right context
	</script>
</body>
</html>
```
