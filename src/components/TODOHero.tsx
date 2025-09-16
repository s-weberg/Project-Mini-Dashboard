function TODOHero({ todos_completed, total_todos }) {
  return (
    <section>
      <div className="text-black">
        <p>{todos_completed} Task Done</p>
        <p>Keep it up</p>
      </div>
      <div className="text-black">
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}
export default TODOHero;
