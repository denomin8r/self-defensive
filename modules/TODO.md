# TODO

[] When placing paintings, just update the map rather than re-building the objects
    + the approach via passing paintings takes 10--15 ms
    + Do I access the paintings via `scene` or `paintings` ?
[] Failure to load resource
[] Add collision checking for paintings
[] In lighting, go back to adding the lightings to a group, AND THEN add them all to the scene. See if that works
[] make 'paintings' global variable in scope of paitings.js... I don't think I need to pass this around!
[] Create bounding boxes for walls in createWalls