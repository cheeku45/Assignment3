$(document).ready(function () {
  // Show/hide password functionality
  $(".toggle-password").click(function () {
    const targetId = $(this).data("target");
    const input = $("#" + targetId);
    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // Email validation
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Password strength
  function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  // On form submit
  $("#registrationForm").on("submit", function (e) {
    e.preventDefault();

    let errors = "";
    let missingFields = "";

    const email = $("#Email").val().trim();
    const phone = $("#phoneno").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmpassword").val();

    // Clear old messages
    $("#errors").hide().html("");
    $("#success").hide().html("");

    // Required field checks
    if (!email) missingFields += "<p>Email is required.</p>";
    if (!phone) missingFields += "<p>Phone number is required.</p>";
    if (!password) missingFields += "<p>Password is required.</p>";
    if (!confirmPassword) missingFields += "<p>Confirm Password is required.</p>";

    // Validation checks
    if (email && !isValidEmail(email)) errors += "<p>Invalid email format.</p>";
    if (phone && (!$.isNumeric(phone) || phone.length !== 10)) {
      errors += "<p>Phone number must be exactly 10 digits.</p>";
    }
    if (password && !isStrongPassword(password)) {
      errors += "<p>Password must be at least 8 characters and include uppercase, lowercase, and a number.</p>";
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors += "<p>Passwords do not match.</p>";
    }

    // Show messages
    if (errors || missingFields) {
      $("#errors").html(missingFields + errors).show();
    } else {
      $("#success").html("🎉 Registration successful!").show();
      $("#registrationForm")[0].reset();
    }
  });
});
