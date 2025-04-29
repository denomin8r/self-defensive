# TODO

- Reactivate tracking the "currentWall" being faced by the viewer
    - At stage 4, I want the behavior where as I face different walls, the calvin image follows me, but all other walls don't change unless according to their timeout. So basically at Stage 4, the currentWall needs one behavior, and the other three walls need a different behavior (and walls besides the last and current wall need to be unaffected)
    - Maybe I can set the metadata of the paintings... so the currentWall painting can be set to 'currentWall=true' and the other can be set to false, and the wall that transitions from true to false falls back to its stage.
    - Now, I am thinking that the elapsed time can be tracked by rendering instead of painting, and that rendering should also instruct the paintings to update

- Gradually increase speed of transitions

- Get powerful symbols